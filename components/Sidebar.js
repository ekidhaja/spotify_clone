import {
    ChartBarIcon,
    ClockIcon,
    DotsHorizontalIcon,
    HomeIcon,
    LogoutIcon
  } from "@heroicons/react/solid";
  import { FaMicrophoneAlt } from "react-icons/fa";
  import { RiCompassFill } from "react-icons/ri";
  import Image from "next/image";
  import { signOut } from "next-auth/react";

const Sidebar = () => {
    return (
        <section className="flex flex-col p-4 items-center bg-black w-[90px] h-screen space-y-8">
            <Image
                src="https://rb.gy/xkacau"
                width={56}
                height={56}
                objectFit="contain"
            />
            <div className="flex flex-col space-y-8">
                <HomeIcon className="sidebarIcon text-white opacity-[0.85]" />
                <RiCompassFill className="sidebarIcon text-2xl" />
                <FaMicrophoneAlt className="sidebarIcon ml-1" />
                <ChartBarIcon className="sidebarIcon" />
                <ClockIcon className="sidebarIcon" />
                <DotsHorizontalIcon className="sidebarIcon" />
                <LogoutIcon className="sidebarIcon lg:hidden" onClick={() => signOut({ redirect: false })} />
            </div>
        </section>
    );
}
 
export default Sidebar;