import { MasonryGallery } from "./Masonry";
import { Info } from "lucide-react";

import "./App.css";

function App() {
  return (
    <>
      <main className="bg-background min-h-screen">
        <div className="mx-auto px-4 py-8 container">
          <div className="mb-8 text-center">
            <h1 className="my-2 font-bold text-foreground text-4xl">Nepal, September 8</h1>
            <p className="text-muted-foreground">
              This media collection documents the events as they unfolded, preserving the truth for public record.
              Viewer discretion is advised.
            </p>
            <p className="font-bold text-bold">
              The protests were not about a social media ban. They rose against something far deeper, the corruption and
              nepotism rotting the government.
            </p>
          </div>
          <div className="flex sm:flex-row flex-col sm:justify-center sm:gap-6 mb-8 text-center">
            <span className="inline-flex justify-center items-center bg-red-500 shadow-sm px-5 py-2 border-destructive rounded-md font-semibold text-white text-base">
              19+ <span className="opacity-80 ml-2 font-normal">Confirmed Deaths</span>
            </span>
            <span className="inline-flex justify-center items-center bg-yellow-400 shadow-sm mt-3 sm:mt-0 px-5 py-2 rounded-md font-semibold text-white text-base">
              345+ <span className="opacity-80 ml-2 font-normal">Injured</span>
            </span>
          </div>
          <MasonryGallery />
        </div>
        <footer className="mx-auto mt-12 px-4 py-8 border-t border-border text-center container">
          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center gap-2 text-muted-foreground text-sm">
              <Info className="w-6 h-6" />
              Disclaimer: The creator of this media collection is not a journalist and does not claim to represent the
              views or opinions of any news organization. This collection is intended for informational purposes only.
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;
