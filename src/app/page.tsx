"use client"
import Body from "@/components/home/Body";
import Footer from "@/components/home/Footer";




export default  function Home() {


  return (
    <>
    <div className="min-h-screen relative"> 
      <div className="min-h-screen  flex flex-col gap-2 ">
        {/* navbar */}

        {/* body */}
        <div className="min-h-screen">
          <Body />
        </div>
        {/*footer  */}
        <div className="absolute bottom-0 w-full" >
          <Footer />
        </div>
      </div>
      </div>

    </>
  );
}
