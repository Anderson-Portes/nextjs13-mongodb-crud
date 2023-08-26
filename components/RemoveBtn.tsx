"use client";
import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";

export interface IRemoveBtn {
  id: string;
}

const RemoveBtn = ({ id }: IRemoveBtn) => {
  const router = useRouter();
  const removeTopic = async () => {
    if (!confirm("Are you sure?")) return;
    const response = await fetch(`http://localhost:3000/api/topics/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.refresh();
    }
  };
  return (
    <button className="text-red-400" onClick={removeTopic}>
      <HiOutlineTrash size={24} />
    </button>
  );
};
export default RemoveBtn;
