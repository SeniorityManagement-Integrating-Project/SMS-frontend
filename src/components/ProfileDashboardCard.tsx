const ProfileDashboardCard = () => (
  <div className='max-h-[414px] rounded-2xl border-2 border-rose-600 p-5'>
    <div className='flex flex-col'>
      <div id='p-projects-container' className='flex flex-col gap-3 '>
        <b>
          <h3 className='text-left text-rose-600 text-xl'>RECENT PROJECTS</h3>
        </b>
        <div>
          <p>We are working on this feature</p>
        </div>
      </div>
      <hr className='border-t-1 border-solid border-t-[#595959] my-5' />
      <div id='p-favTools-container' className='flex flex-col gap-3'>
        <b>
          <h3 className='text-left text-rose-600 text-xl'>FAVORITE TOOLS</h3>
        </b>
        <div>
          <p>We are working on this feature</p>
        </div>
      </div>
    </div>
  </div>
);

export { ProfileDashboardCard };
