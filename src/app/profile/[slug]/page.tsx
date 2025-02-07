import React from 'react';
import { Linkedin } from '../../../../public/icons/Linkedin';
import { Github } from '../../../../public/icons/Github';
import { Twitter } from '../../../../public/icons/Twitter';
import { Gmail } from '../../../../public/icons/Instagram'; // Ensure correct import
import { prisma } from '@/lib/prisma';
import Button_toshare from '@/components/createProfile/Button_to_share';

// type Profile = { name: string; link: string; icon: React.JSX.Element };

async function page({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const userprofile = await prisma.profile.findUnique({
    where: {
      slug
    },
    select: {
      name: true,
      message: true,
      image: true,
      link: true
    }
  });



  return (
    <>
      {userprofile ? (
        <div className='flex flex-col min-h-screen w-full relative'>
          <div className='h-64 md:h-64 w-full bg-purple-800'></div>
          <div className='h-2/3 w-full'></div>
          <div className='flex justify-center items-center min-h-screen w-full absolute px-4'>
            <div className='w-full sm:w-4/5 lg:w-2/3 xl:w-1/2 px-4 sm:px-5'>
              <div className='min-h-[500px] px-6 sm:px-8 py-4 border rounded-xl flex flex-col gap-5 relative shadow-2xl shadow-purple-300 bg-white mt-10'>
                {/* Top section */}
                <div className='flex justify-between items-center relative text-sm sm:text-base'>
                  <h2 className='text-md sm:text-xl text-purple-800 font-semibold tracking-tighter'>Connect</h2>
                  <div
                    className='w-32 h-32 sm:w-48 sm:h-48 rounded-full overflow-hidden bg-cover bg-center shadow-xl shadow-purple-950 absolute left-1/2 transform -translate-x-1/2 top-[-60px] sm:top-[-80px] hover:scale-105 transition'
                    style={{ backgroundImage: `url(${userprofile.image})` }}
                  ></div>
                  <h2 className='text-md sm:text-xl text-purple-800 font-semibold tracking-tighter'>Message</h2>
                </div>

                {/* Name and Message */}
                <div className='text-center overflow-hidden mt-24 sm:mt-28'>
                  <h1 className='text-2xl sm:text-4xl font-bold text-zinc-700 break-words'>{userprofile.name}</h1>
                  <h6 className='text-zinc-500 mt-2 sm:mt-3 break-words text-sm sm:text-base'>{userprofile.message}</h6>
                </div>

                {/* Profiles Section */}
                <h3 className='text-lg sm:text-xl tracking-tighter font-bold text-zinc-700 mt-4 sm:mt-6 text-center'>
                  Profiles
                </h3>
                <div className='flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 sm:mt-6'>
                  {Array.isArray(userprofile.link) &&
                    userprofile.link?.map((elem: any, index: number) => (
                      <div
                        key={index}
                        className='rounded-full w-12 h-12 sm:w-16 sm:h-16 flex justify-center items-center bg-white shadow-2xl border-sky-100'
                      >
                        {elem.name === 'LinkedIn' && (
                          <a className='hover:scale-110 transition' href={elem.link}>
                            <Linkedin />
                          </a>
                        )}
                        {elem.name === 'GitHub' && (
                          <a className='hover:scale-110 transition' href={elem.link}>
                            <Github />
                          </a>
                        )}
                        {elem.name === 'Twitter' && (
                          <a className='hover:scale-110 transition' href={elem.link}>
                            <Twitter />
                          </a>
                        )}
                        {elem.name === 'Gmail' && (
                          <a className='hover:scale-110 transition' href={elem.link}>
                            <Gmail />
                          </a>
                        )}
                      </div>
                    ))}
                </div>

                {/* Share Profile Button */}
                <div className='flex justify-center mt-4'>
                  <Button_toshare slug={slug} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        'Loading...'
      )}
    </>
  );
}

export default page;
