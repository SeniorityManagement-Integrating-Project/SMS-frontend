import { FaGithub, FaRegEnvelope } from 'react-icons/fa';

interface Props {
  name: string;
  email: string;
  role: string;
}

const ProfileMainCard = ({ name, email, role }: Props) => {
  // TODO: Try to handle the text overflow in the name and email
  //  Add GitHub Username, About Me/Description, and Fun Fact to DB records
  //  Get and Display the profile picture from Auth0 (if possible)

  return (
    <div className='max-w-[580px] max-h-[762px] rounded-2xl border-2 border-rose-600 p-10'>
      <div id='p-main-container' className='flex flex-col'>
        <div id='p-main-container1' className='grid grid-cols-[1.5fr_3fr] h-full w-full'>
          <div className='flex flex-col items-center justify-center col-span-1'>
            <div
              className={`h-48 w-48 rounded-full border-4 bg-[url('../../public/prof_pic.png')] bg-cover bg-center`}
            />
          </div>
          <div className='flex flex-col items-start justify-start col-span-1 pl-4 gap-4'>
            <b>
              <h3>
                <span className='text-4xl font-bold text-gray-900'>{name}</span>
              </h3>
            </b>
            <b>
              <h3>
                <span className='text-xl font-bold text-rose-600'>{role}</span>
              </h3>
            </b>
            <div className='flex flex-wrap h-full text-gray-900 text-ellipsis'>
              <a className='flex flex-wrap gap-2 items-center mb-3 w-full' href='mailto:sebas.suarez@softserve-sms.com'>
                <FaRegEnvelope className='text-rose-600 text-xl' />
                <b className='text-gray-500 text-[14px]'>
                  <p>{email}</p>
                </b>
              </a>
              <a
                className='flex flex-wrap gap-2 items-center mb-3 w-full'
                href='https://github.com/sebinllas'
                target='_blank'
                rel='noreferrer'
              >
                <FaGithub className='text-rose-600 text-xl' />
                <b className='text-gray-500 text-[14px]'>
                  <p>sebinllas</p>
                </b>
              </a>
            </div>
          </div>
        </div>
        <hr className='border-t-1 border-solid border-t-[#595959] my-5' />
        <div id='p-main-container2' className='flex flex-col items-start justify-start gap-3'>
          <b>
            <h3 className='text-left text-rose-600 text-xl'>ABOUT ME</h3>
          </b>
          <p className='text-justify text-gray-900 mb-3'>
            I am flexible, reliable and possess excellent time keeping skills. I am an enthusiastic, self-motivated,
            reliable, responsible and hard working person. I am a mature team worker and adaptable to all challenging
            situations. I am able to work well both in a team environment as well as using own initiative.
          </p>
          <b>
            <h3 className='text-left text-rose-600 text-xl'>FUN FACT</h3>
          </b>
          <p className='text-justify text-gray-900'>
            I remember spending hours dancing in the street to the rhythm of the Spice Girls, those spicy girls were a
            phenomenon among the kids of the 90s.
          </p>
        </div>
      </div>
    </div>
  );
};

export { ProfileMainCard };
