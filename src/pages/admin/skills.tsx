import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/router';
import { Loader } from '@/components/Loader';
import { BasicCard } from '@/components/BasicCard';
import Swal from 'sweetalert2';
import { BasicForm } from '@/components/BasicForm';

const Skills = () => {
  const router = useRouter();
  const { data, loading, error, reload } = useFetch<any>(`${process.env.NEXT_PUBLIC_API_URL}/skill/`, router.isReady);
  const handleDelete = (id: number) => {
    const deleteSkill = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skill/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        reload();
        const deleteData = await response.json();
        await Swal.fire({
          title: 'Deleted!',
          text: `The skill ${deleteData.name} has been deleted successfully.`,
          icon: 'success',
          confirmButtonText: 'Cool',
        });
      }
    };
    deleteSkill();
  };
  const handleSubmit = ({ name, description }: { name: string; description: string }) => {
    const createSkill = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skill/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          description,
        }),
      });
      const createData = await response.json();
      if (response.status === 200) {
        reload();
        await Swal.fire({
          title: 'Created!',
          text: `The skill ${createData.name} has been created successfully.`,
          icon: 'success',
          confirmButtonText: 'Cool',
        });
      } else if (response.status === 409) {
        await Swal.fire({
          title: 'Error!',
          text: `${createData.message}`,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    };
    createSkill();
  };

  let content;
  if (loading) {
    content = <Loader />;
  } else if (error) {
    content = <p>Something went wrong, try again</p>;
  } else {
    content = (
      <>
        {data.length === 0 ? (
          <p>No skills found</p>
        ) : (
          <div className='flex flex-wrap justify-center gap-2 p-4 '>
            {data.map((skill: any) => (
              <BasicCard
                key={skill.id}
                title={skill.name}
                text={skill.description}
                handleDelete={() => handleDelete(skill.id)}
              />
            ))}
          </div>
        )}
        <BasicForm onSubmit={handleSubmit} />
      </>
    );
  }
  return (
    <main>
      <h1 className='mx-auto my-4 text-2xl font-bold text-center text-rose-500'>Skills</h1>
      {content}
    </main>
  );
};

export default Skills;
