import { Modal } from 'antd';

interface PropsSuccessModal {
  isOpen: boolean;
  isEditing: boolean;
}

export function SuccessModal({ isOpen, isEditing }: PropsSuccessModal) {
  return (
    <Modal
      open={isOpen}
      footer={null}
      closable={false}
    >
      <p>Ваш пост успешно {isEditing ? 'обновлен' : 'добавлен'}!</p>
    </Modal>
  );
}
