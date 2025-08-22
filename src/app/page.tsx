"use client";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function RedirectToKeys() {
  const router = useRouter();
  useEffect(() => {
    router.push("/keys");
  }, [router]);
  return null;
}

export default function HomePage() {
  return (
    <main className="">
      <SignedOut>
        {/* ✅ Hover Container */}
        <div className="w-full flex justify-center mt-6 px-4">
          <div className="group relative w-full max-w-3xl bg-gray-900 text-white rounded-lg shadow-lg p-6 cursor-pointer overflow-hidden transition-all duration-500">
            {/* Default text (before hover) */}
            <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold opacity-100 group-hover:opacity-0 transition-opacity duration-500">
              PLEASE SIGN IN
            </div>

            {/* Hover text (description) */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <h1 className="text-2xl font-bold mb-2 text-center">
                Welcome to Our Art Gallery System 🎨
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed text-center">
                To upload your photos and manage them, you need to{" "}
                <span className="font-semibold text-white">sign in first</span>.  
                Once signed in, you’ll receive your own{" "}
                <span className="font-semibold text-white">API keys</span> to upload and access your images.
              </p>
            </div>
          </div>
        </div>

        {/* ✅ Images Section */}
        <div className="flex justify-center gap-6 mt-8 px-4 flex-wrap">
          {[
            {
              url: "https://scontent.fcrk1-4.fna.fbcdn.net/v/t1.15752-9/385530700_619380286848061_9174381589523629532_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHIYl1GiuDmzMtJTmoGRhjLwULp4eJCrOrBQunh4kKs6ngRbNkkOIB5yvgWYxWiLOCnutXmwXcfr1yY1VKtJAmn&_nc_ohc=p1GhkfrC3ewQ7kNvwFcflGp&_nc_oc=AdkhfS95O7sUcDifIgyKGoG33rxbEqH6d_SuccRjlyOCKKSEzqtZY809rrs36RozbqE&_nc_zt=23&_nc_ht=scontent.fcrk1-4.fna&oh=03_Q7cD3AHhfVr1Qqb2asqyhiuAGRHHfR_BxIaCowT4Ye_wVX1rXw&oe=68CE981E",
              title: "Girl with a Pearl Earring",
              artist: "Johannes Vermeer",
            },
            {
              url: "https://scontent.fcrk1-2.fna.fbcdn.net/v/t1.15752-9/529243525_584683944577840_8246590300739844339_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeH5EzWlasRDfFLitMSZWDJjEmPRCpQhPyUSY9EKlCE_Jelaru1sISghImYhjBfw9v77FUCa0VnnaAGIOi7Ai2up&_nc_ohc=KISI2te_4AkQ7kNvwGCFOlI&_nc_oc=AdnPvS7-J1oOA6vCHNdAliqkmw8Cc2XXgS1lJ4rMJHes71dUFD62yruZ1_TVTSRwbSY&_nc_zt=23&_nc_ht=scontent.fcrk1-2.fna&oh=03_Q7cD3AEa-OhYe4vsQt1WN9JjG9MB3i4tB9t42bZm-DIaTzI4HA&oe=68CEB75D",
              title: "Leaning Tower of Pisa (Van Gogh Style)",
              artist: "Bonanno Pisano",
            },
            {
              url: "https://scontent.fcrk1-5.fna.fbcdn.net/v/t1.15752-9/526873278_3236127366553290_2190131994399160107_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHB-gN9TI-WLkYc3OqZ8iSJwThqT4ArFKbBOGpPgCsUpvmyjfIaTZ0EAMFqhcEI8kYxBNSlPRwIoIiiDQ_hqxb-&_nc_ohc=ejUb0mKi8lgQ7kNvwGSVzGM&_nc_oc=AdneZvqRk3xJmg96-f2A53k903IijMGnvgjSgL15thcvJtGOQsFCKoMljmtLaEiYrZQ&_nc_zt=23&_nc_ht=scontent.fcrk1-5.fna&oh=03_Q7cD3AFNwW3Wzi-HpWdT0NBBBkiG6SHAcJy0j3yqmcKmGdKpoA&oe=68CE9D94",
              title: "Mona Lisa",
              artist: "Leonardo da Vinci",
            },
          ].map((art, index) => (
            <div
              key={index}
              className="relative w-[300px] h-[400px] rounded-lg overflow-hidden group shadow-lg"
            >
              <img
                src={art.url}
                alt={art.title}
                className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-100 backdrop-blur-sm opacity-0 group-hover:opacity-70 transition-opacity duration-300 flex items-center justify-center text-white px-4 text-center">
                <div>
                  <div className="text-xl font-bold mb-1">{art.title}</div>
                  <div className="text-sm">{art.artist}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SignedOut>

      <SignedIn>
        <RedirectToKeys />
      </SignedIn>
    </main>
  );
}
