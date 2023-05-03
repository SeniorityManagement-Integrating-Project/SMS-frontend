import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

interface Props {
  title: string;
  description: string;
  id: number;
  reloadSkills: () => void;
}

const SkillCard = ({ title, description, id, reloadSkills }: Props) => {
  const handleClick = () => {
    const deleteSkill = async () => {
      const response = await fetch(`http://ec2-35-171-27-114.compute-1.amazonaws.com:9000/skill/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        reloadSkills();
        const data = await response.json();
        await Swal.fire({
          title: 'Deleted!',
          text: `The skill ${data.name} has been deleted successfully.`,
          icon: 'success',
          confirmButtonText: 'Cool',
        });
      }
    };
    deleteSkill();
  };
  return (
    <div className='relative p-4 bg-white border-2 rounded-md shadow-md border-b-rose-600 w-60'>
      <h3 className='text-lg font-medium text-gray-900'>{title}</h3>
      <p className='text-gray-500'>{description}</p>
      <button type='button' onClick={handleClick} className='absolute w-6 h-6 bg-red-500 rounded-full top-1 right-1'>
        ×
      </button>
    </div>
  );
};
export { SkillCard };
