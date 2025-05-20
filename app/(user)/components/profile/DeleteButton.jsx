import { Button, Modal } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { deleteUser } from "@/lib/features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";

const DeleteButton = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const handleDeleteUser = () => {
    setIsDeleteModalOpen(true);
  };
  const deleteUserById = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/auth/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await res.json();
      setLoading(false);
      if (res.ok) {
        dispatch(deleteUser());
        router.push("/login");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Button
        disabled={loading}
        color='failure'
        size='sm'
        className='flex items-center'
        onClick={handleDeleteUser}
      >
        <MdDelete className='me-2 h-4 w-4' />
        <span>Delete</span>
      </Button>
      <Modal
        show={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <Modal.Header>Delete {currentUser?.name}</Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete your account? This action cannot be
            undone and will permanently delete your data including subscriptions, addOns, and payment details.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={loading} onClick={() => setIsDeleteModalOpen(false)} color='gray'>
            Cancel
          </Button>
          <Button disabled={loading} onClick={() => deleteUserById(currentUser?._id)} color='red'>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeleteButton;
