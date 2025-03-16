import React, { useState } from 'react';
import { Upload, Youtube, Loader2, Play, Moon, Sun } from 'lucide-react';

interface SummaryState {
  loading: boolean;
  summary: string | null;
  error: string | null;
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [videoSource, setVideoSource] = useState<'upload' | 'youtube'>('upload');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [summaryState, setSummaryState] = useState<SummaryState>({
    loading: false,
    summary: null,
    error: null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSummaryState({ loading: true, summary: null, error: null });

    // Placeholder for API call to your Python backend
    try {
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      setSummaryState({
        loading: false,
        summary: "This is where your AI model's summary will appear...",
        error: null,
      });
    } catch (error) {
      setSummaryState({
        loading: false,
        summary: null,
        error: 'Failed to process video. Please try again.',
      });
    }
  };

  return (
    <div className={`min-h-screen ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-50'
    } flex items-center`}>
      <div className="container mx-auto px-4 pt-[10vh] relative">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-0 right-4 p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-500 transition-colors"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6 text-yellow-300" />
          ) : (
            <Moon className="w-6 h-6 text-gray-700" />
          )}
        </button>

        <header className="text-center mb-16">
          <h1 className={`text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Immerse AI
          </h1>
          <p className={isDarkMode ? 'text-lg text-gray-300' : 'text-lg text-gray-600'}>
            Transform your videos into interactive 3D summaries
          </p>
        </header>

        <div className={`max-w-2xl mx-auto ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-xl shadow-lg p-8`}>
          <div className="flex gap-4 mb-8">
            <button
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                videoSource === 'upload'
                  ? 'bg-indigo-600 text-white'
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setVideoSource('upload')}
            >
              <Upload size={20} />
              Upload Video
            </button>
            <button
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                videoSource === 'youtube'
                  ? 'bg-indigo-600 text-white'
                  : isDarkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setVideoSource('youtube')}
            >
              <Youtube size={20} />
              YouTube URL
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {videoSource === 'upload' ? (
              <div className={`border-2 border-dashed ${
                isDarkMode ? 'border-gray-600' : 'border-gray-300'
              } rounded-lg p-8 text-center`}>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="video-upload"
                />
                <label
                  htmlFor="video-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Upload className={`w-12 h-12 mb-4 ${
                    isDarkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    {file ? file.name : 'Click to upload or drag and drop'}
                  </span>
                  <span className={`text-sm mt-2 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>
                    MP4, WebM, or OGG (Max 500MB)
                  </span>
                </label>
              </div>
            ) : (
              <div className="space-y-2">
                <label
                  htmlFor="youtube-url"
                  className={`block text-sm font-medium ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  YouTube Video URL
                </label>
                <input
                  type="url"
                  id="youtube-url"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                      : 'border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                  }`}
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={summaryState.loading}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {summaryState.loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Play />
                  Generate Summary
                </>
              )}
            </button>
          </form>

          {summaryState.error && (
            <div className={`mt-6 p-4 rounded-lg ${
              isDarkMode ? 'bg-red-900/50 text-red-300' : 'bg-red-50 text-red-700'
            }`}>
              {summaryState.error}
            </div>
          )}

          {summaryState.summary && (
            <div className="mt-8">
              <h2 className={`text-xl font-semibold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Summary
              </h2>
              <div className={`p-6 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <div className={`aspect-video rounded-lg mb-4 flex items-center justify-center ${
                  isDarkMode ? 'bg-gray-600' : 'bg-gray-200'
                }`}>
                  <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                    3D Model Viewer
                  </p>
                </div>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {summaryState.summary}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;