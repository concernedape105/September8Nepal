import { MasonryGallery } from "./Masonry";
import { Info } from "lucide-react";
import "./App.css";

function App() {
  return (
    <>
      <aside
        className="top-0 left-0 z-50 sticky bg-red-500 py-2 w-full text-white text-center"
        role="status"
        aria-live="polite"
      >
        ⚠️ Urgent: Major hospitals, including Civil Hospital, have run out of blood collection equipment. Please donate
        blood at your nearest blood bank to help save lives.
      </aside>
      {/* Top-level flex column wrapper */}
      <div className="flex flex-col bg-background min-h-screen">
        <main className="flex-1">
          <div className="basis-[20%]">
            <div className="mb-8 text-center">
              <h1 className="my-2 font-bold text-foreground text-4xl">Nepal, September 8</h1>
              <p className="text-muted-foreground">
                This media collection documents the events as they unfolded, preserving the truth for public record.
                Viewer discretion is advised.
              </p>
              <p className="font-bold text-bold">
                The protests were not about a social media ban. They rose against something far deeper, the corruption
                and nepotism rotting the government.
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
          </div>
          <div className="h-full basis-[75%]">
            <MasonryGallery />
          </div>
        </main>
        {/* Footer outside main, always at bottom */}
        <footer className="px-4 py-4 border-t text-center">
          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center gap-2 text-muted-foreground text-sm">
              <Info className="w-6 h-6" />
              Disclaimer: This website is an independent aggregator. The operator does not film, upload, endorse, or
              verify any content. All videos are provided as-is from public or anonymous sources. No responsibility is
              taken for the actions depicted or the accuracy of the material. For informational purposes only.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
