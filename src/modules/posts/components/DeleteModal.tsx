import { Modal } from 'antd';

interface DeleteModalProps {
  isOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export function DeleteModal({ isOpen, onOk, onCancel }: DeleteModalProps) {
  return (
    <Modal
      title='Подтвердите удаление поста'
      cancelText='Нет'
      okText='Да'
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
    >
      <p>Вы уверены, что хотите удалить этот пост?</p>
    </Modal>
  );
}
