import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, message } from 'antd';
import Title from 'antd/es/typography/Title';
import styled from 'styled-components';
import {
  useAddPostMutation,
  useGetPostsQuery,
  useUpdatePostMutation,
} from '../models/api';
import { Post } from '../models/types';
import { SuccessModal } from './../components/SuccessModal';
import { PostForm } from '../components/PostForm';

const DRAFT_KEY = 'post_form_draft';

export function PostFormContainer() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [category, setCategory] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm<Post>();
  const { refetch } = useGetPostsQuery();
  const [addPost] = useAddPostMutation();
  const [updatePost] = useUpdatePostMutation();

  const post = location.state?.post;

  useEffect(() => {
    if (post) {
      form.setFieldsValue(post);
      setCategory(post.type);
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [post, form]);

  useEffect(() => {
    const draft = localStorage.getItem(DRAFT_KEY);
    if (draft) {
      const parsedDraft = JSON.parse(draft);
      form.setFieldsValue(parsedDraft);
      if (parsedDraft.type) setCategory(parsedDraft.type);
    }
  }, [form]);

  const handleFormChange = () => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(form.getFieldsValue()));
  };

  const handleFormSubmit = async (values: Post) => {
    try {
      if (isEditing && String(post?.id)) {
        await updatePost({ id: post.id, data: values }).unwrap();
        message.success('Объявление успешно обновлено!');
      } else {
        await addPost(values).unwrap();
        message.success('Объявление успешно создано!');
      }

      localStorage.removeItem(DRAFT_KEY);
      form.resetFields();
      refetch();
      setIsSuccessModalOpen(true);
      setTimeout(() => {
        setIsSuccessModalOpen(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Ошибка при отправки формы:', error);
      message.error('Ошибка при создании объявления');
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    form.resetFields();
    setCategory('');
    message.success('Черновик очищен');
  };

  return (
    <CenteredContainer>
      <StyledHeader>
        {isEditing ? 'Редактирование объявления' : 'Создание объявления'}
      </StyledHeader>

      <PostForm
        form={form}
        onSubmit={handleFormSubmit}
        onChange={handleFormChange}
        isEditing={isEditing}
        clearDraft={clearDraft}
        category={category}
        setCategory={setCategory}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        isEditing={isEditing}
      />
    </CenteredContainer>
  );
}

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
`;

const StyledHeader = styled(Title)`
  text-align: center;
`;
