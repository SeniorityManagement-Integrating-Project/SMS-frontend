import { useFetch } from '@/hooks/useFetch';
import { useRouter } from 'next/router';
import { Loader } from '@/components/Loader';
import Swal from 'sweetalert2';
import { BasicForm } from '@/components/BasicForm';
import { BasicCard } from '@/components/BasicCard';
import Link from 'next/link';

const Roles = () => {
  const router = useRouter();
  const { data, loading, error, reload } = useFetch<any>(`${process.env.NEXT_PUBLIC_API_URL}/role/`, router.isReady);
  const handleDelete = (id: number) => {
    const deleteRole = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/role/${id}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        reload();
        const deleteData = await response.json();
        await Swal.fire({
          title: 'Deleted!',
          text: `The role ${deleteData.name} has been deleted successfully.`,
          icon: 'success',
          confirmButtonText: 'Cool',
        });
      }
    };
    deleteRole();
    reload();
  };
  const handleSubmit = ({ name, description }: { name: string; description: string }) => {
    const createSkill = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/role/`, {
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
        await Swal.fire({
          title: 'Created!',
          text: `The role ${createData.name} has been created successfully.`,
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
    reload();
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
          <p>No roles found</p>
        ) : (
          <div className='flex flex-wrap justify-center gap-2 p-4 '>
            {data.map((role: any) => (
              <Link href={`/admin/role/${role.id}`} key={role.id} className='flex items-stretch'>
                <BasicCard title={role.name} text={role.description} handleDelete={() => handleDelete(role.id)} />
              </Link>
            ))}
          </div>
        )}
        <BasicForm onSubmit={handleSubmit} />
      </>
    );
  }
  return (
    <main>
      <h1 className='mx-auto my-4 text-2xl font-bold text-center text-rose-500'>Roles</h1>
      {content}
    </main>
  );
};

export default Roles;
