import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { 
  User, Star, Award, FolderOpen, BookOpen, Briefcase, 
  Upload, Download, Lock, Eye, Settings, Rocket
} from "lucide-react";

export function AdminWelcome() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-200">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-3">
            <Settings className="w-8 h-8 text-blue-600" />
            Welcome to Your Portfolio Admin Panel!
          </CardTitle>
          <CardDescription className="text-base">
            Manage all your portfolio content and images in one place, without touching any code.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="bg-white rounded-lg p-6 space-y-4">
            <h3 className="text-lg flex items-center gap-2">
              <Eye className="w-5 h-5 text-green-600" />
              Quick Start Guide
            </h3>
            <ol className="space-y-2 text-sm list-decimal list-inside text-gray-700">
              <li>Use the tabs above to navigate between different sections</li>
              <li>Update your content in each section (text, images, etc.)</li>
              <li>Click the "Save" button at the bottom of each section</li>
              <li>Close the admin panel to see your changes live!</li>
              <li>Always export your data as a backup</li>
            </ol>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="text-sm">Personal Info</h4>
              </div>
              <p className="text-xs text-gray-600">
                Update your name, contact details, bio, and profile image
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                <h4 className="text-sm">Hero Section</h4>
              </div>
              <p className="text-xs text-gray-600">
                Customize your homepage hero headline and description
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-orange-600" />
                </div>
                <h4 className="text-sm">Stats & Skills</h4>
              </div>
              <p className="text-xs text-gray-600">
                Update your achievements, statistics, and skill categories
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-green-600" />
                </div>
                <h4 className="text-sm">Experience</h4>
              </div>
              <p className="text-xs text-gray-600">
                Add your work history, roles, and key achievements
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-indigo-600" />
                </div>
                <h4 className="text-sm">Projects</h4>
              </div>
              <p className="text-xs text-gray-600">
                Upload project images, details, and mark featured works
              </p>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-pink-600" />
                </div>
                <h4 className="text-sm">Case Studies</h4>
              </div>
              <p className="text-xs text-gray-600">
                Create detailed case studies with challenges and results
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="text-sm flex items-center gap-2 mb-2">
              <Upload className="w-4 h-4 text-yellow-700" />
              <span className="text-yellow-900">Image Upload Tips</span>
            </h4>
            <ul className="text-xs text-yellow-800 space-y-1">
              <li>• Profile images: Square format, max 2MB</li>
              <li>• Project images: Landscape format, max 2MB</li>
              <li>• Supported formats: JPG, PNG, GIF, WebP</li>
              <li>• Images are stored in your browser (localStorage)</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="text-sm flex items-center gap-2 mb-2">
              <Download className="w-4 h-4 text-green-700" />
              <span className="text-green-900">Always Backup Your Data!</span>
            </h4>
            <p className="text-xs text-green-800 mb-2">
              Click "Export Data" in the top bar to download a backup JSON file. 
              This is important because your data is stored locally in your browser.
            </p>
            <p className="text-xs text-green-800">
              If you clear your browser data or switch browsers, you'll need this backup to restore your content.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-blue-700" />
              <span className="text-blue-900">Security & Access</span>
            </h4>
            <p className="text-xs text-blue-800 mb-1">
              Your admin panel is password-protected and all data is stored locally in your browser.
            </p>
            <p className="text-xs text-blue-800">
              To open admin panel: Click the settings icon (⚙️) or press Ctrl+Shift+A (Cmd+Shift+A on Mac)
            </p>
          </div>

        </CardContent>
      </Card>

      <div className="text-center text-sm text-gray-600 flex items-center justify-center gap-2">
        <p>Ready to customize your portfolio? Start by clicking the tabs above!</p>
        <Rocket className="w-4 h-4 text-blue-600" />
      </div>
    </div>
  );
}