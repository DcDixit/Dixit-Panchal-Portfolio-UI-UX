/**
 * Admin Access Guide Component
 * 
 * This component can be temporarily added to any page to show users
 * how to access the admin panel. Remove it once you're familiar with the system.
 */

import { Settings, Keyboard, Edit, Image, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function AdminAccessGuide() {
  return (
    <div className="fixed bottom-24 right-6 z-30 max-w-sm">
      <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0 shadow-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Admin Panel Available!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-blue-100">
            Your portfolio has a content management system. Access it to edit your content and upload images.
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium">Click Settings Button</p>
                <p className="text-xs text-blue-200">Bottom-right corner ⚙️</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-white/10 rounded-lg p-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium">Or Use Keyboard</p>
                <div className="flex items-center gap-1 mt-1">
                  <Keyboard className="w-3 h-3" />
                  <span className="text-xs text-blue-200">Ctrl + Shift + A</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/20">
            <div className="flex items-center gap-3 text-xs text-blue-200">
              <div className="flex items-center gap-1">
                <Edit className="w-3 h-3" />
                <span>Edit content</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Image className="w-3 h-3" />
                <span>Upload images</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Save className="w-3 h-3" />
                <span>Export backups</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * USAGE:
 * 
 * 1. Import this component in any page (e.g., HomePage.tsx):
 *    import { AdminAccessGuide } from "../AdminAccessGuide";
 * 
 * 2. Add it to your JSX:
 *    <AdminAccessGuide />
 * 
 * 3. Remove it once you're familiar with accessing the admin panel
 * 
 * The guide shows up in the bottom-right corner, above the settings button.
 */