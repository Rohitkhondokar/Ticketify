// "use client";

// import { useState, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { Badge } from "@/components/ui/badge";
// import {
//   Bell,
//   Shield,
//   Lock,
//   Eye,
//   EyeOff,
//   Save,
//   Mail,
//   Smartphone,
//   Globe,
//   Moon,
//   Sun,
// } from "lucide-react";

// export default function UserSettingsPage() {
//   const [settings, setSettings] = useState({
//     notifications: {
//       email: true,
//       sms: false,
//       push: true,
//       marketing: false,
//     },
//     privacy: {
//       profileVisibility: "public",
//       showEmail: false,
//       showPhone: false,
//     },
//     security: {
//       twoFactorAuth: false,
//       sessionTimeout: 30,
//     },
//     preferences: {
//       theme: "light",
//       language: "en",
//       timezone: "UTC",
//     },
//   });
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [passwordData, setPasswordData] = useState({
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });

//   const handleNotificationChange = (type, value) => {
//     setSettings(prev => ({
//       ...prev,
//       notifications: {
//         ...prev.notifications,
//         [type]: value
//       }
//     }));
//   };

//   const handlePrivacyChange = (type, value) => {
//     setSettings(prev => ({
//       ...prev,
//       privacy: {
//         ...prev.privacy,
//         [type]: value
//       }
//     }));
//   };

//   const handleSecurityChange = (type, value) => {
//     setSettings(prev => ({
//       ...prev,
//       security: {
//         ...prev.security,
//         [type]: value
//       }
//     }));
//   };

//   const handlePreferenceChange = (type, value) => {
//     setSettings(prev => ({
//       ...prev,
//       preferences: {
//         ...prev.preferences,
//         [type]: value
//       }
//     }));
//   };

//   const handlePasswordChange = (field, value) => {
//     setPasswordData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handlePasswordUpdate = async () => {
//     if (passwordData.newPassword !== passwordData.confirmPassword) {
//       alert("New passwords don't match!");
//       return;
//     }

//     if (passwordData.newPassword.length < 6) {
//       alert("Password must be at least 6 characters long!");
//       return;
//     }

//     setLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       alert("Password updated successfully!");
//       setPasswordData({
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//       setLoading(false);
//     }, 1000);
//   };

//   const handleSaveSettings = async () => {
//     setLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       alert("Settings saved successfully!");
//       setLoading(false);
//     }, 1000);
//   };

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
//           <p className="text-gray-600">Manage your account preferences and security</p>
//         </div>
//         <Button
//           onClick={handleSaveSettings}
//           disabled={loading}
//           className="bg-[#00453e] hover:bg-[#003530]"
//         >
//           <Save className="h-4 w-4 mr-2" />
//           {loading ? "Saving..." : "Save Settings"}
//         </Button>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Notifications */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Bell className="h-5 w-5" />
//               Notifications
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Mail className="h-4 w-4 text-gray-400" />
//                 <span className="text-sm font-medium">Email Notifications</span>
//               </div>
//               <Switch
//                 checked={settings.notifications.email}
//                 onCheckedChange={(value) => handleNotificationChange("email", value)}
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Smartphone className="h-4 w-4 text-gray-400" />
//                 <span className="text-sm font-medium">SMS Notifications</span>
//               </div>
//               <Switch
//                 checked={settings.notifications.sms}
//                 onCheckedChange={(value) => handleNotificationChange("sms", value)}
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Bell className="h-4 w-4 text-gray-400" />
//                 <span className="text-sm font-medium">Push Notifications</span>
//               </div>
//               <Switch
//                 checked={settings.notifications.push}
//                 onCheckedChange={(value) => handleNotificationChange("push", value)}
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Mail className="h-4 w-4 text-gray-400" />
//                 <span className="text-sm font-medium">Marketing Emails</span>
//               </div>
//               <Switch
//                 checked={settings.notifications.marketing}
//                 onCheckedChange={(value) => handleNotificationChange("marketing", value)}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Privacy */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Shield className="h-5 w-5" />
//               Privacy
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label className="text-sm font-medium">Profile Visibility</Label>
//               <select
//                 value={settings.privacy.profileVisibility}
//                 onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)}
//                 className="w-full p-2 border rounded-md"
//               >
//                 <option value="public">Public</option>
//                 <option value="friends">Friends Only</option>
//                 <option value="private">Private</option>
//               </select>
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Mail className="h-4 w-4 text-gray-400" />
//                 <span className="text-sm font-medium">Show Email Address</span>
//               </div>
//               <Switch
//                 checked={settings.privacy.showEmail}
//                 onCheckedChange={(value) => handlePrivacyChange("showEmail", value)}
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Smartphone className="h-4 w-4 text-gray-400" />
//                 <span className="text-sm font-medium">Show Phone Number</span>
//               </div>
//               <Switch
//                 checked={settings.privacy.showPhone}
//                 onCheckedChange={(value) => handlePrivacyChange("showPhone", value)}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Security */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Lock className="h-5 w-5" />
//               Security
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <Shield className="h-4 w-4 text-gray-400" />
//                 <span className="text-sm font-medium">Two-Factor Authentication</span>
//               </div>
//               <Switch
//                 checked={settings.security.twoFactorAuth}
//                 onCheckedChange={(value) => handleSecurityChange("twoFactorAuth", value)}
//               />
//             </div>

//             <div className="space-y-2">
//               <Label className="text-sm font-medium">Session Timeout (minutes)</Label>
//               <Input
//                 type="number"
//                 value={settings.security.sessionTimeout}
//                 onChange={(e) => handleSecurityChange("sessionTimeout", parseInt(e.target.value))}
//                 min="5"
//                 max="120"
//                 className="w-full"
//               />
//             </div>

//             <div className="pt-4 border-t">
//               <h4 className="font-medium mb-3">Change Password</h4>
//               <div className="space-y-3">
//                 <div className="space-y-1">
//                   <Label className="text-sm">Current Password</Label>
//                   <div className="relative">
//                     <Input
//                       type={showPassword ? "text" : "password"}
//                       value={passwordData.currentPassword}
//                       onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
//                       placeholder="Enter current password"
//                     />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                     </Button>
//                   </div>
//                 </div>

//                 <div className="space-y-1">
//                   <Label className="text-sm">New Password</Label>
//                   <Input
//                     type="password"
//                     value={passwordData.newPassword}
//                     onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
//                     placeholder="Enter new password"
//                   />
//                 </div>

//                 <div className="space-y-1">
//                   <Label className="text-sm">Confirm New Password</Label>
//                   <Input
//                     type="password"
//                     value={passwordData.confirmPassword}
//                     onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
//                     placeholder="Confirm new password"
//                   />
//                 </div>

//                 <Button
//                   onClick={handlePasswordUpdate}
//                   disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
//                   className="w-full bg-[#00453e] hover:bg-[#003530]"
//                 >
//                   {loading ? "Updating..." : "Update Password"}
//                 </Button>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Preferences */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Globe className="h-5 w-5" />
//               Preferences
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="space-y-2">
//               <Label className="text-sm font-medium">Theme</Label>
//               <div className="flex gap-2">
//                 <Button
//                   variant={settings.preferences.theme === "light" ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => handlePreferenceChange("theme", "light")}
//                   className="flex items-center gap-2"
//                 >
//                   <Sun className="h-4 w-4" />
//                   Light
//                 </Button>
//                 <Button
//                   variant={settings.preferences.theme === "dark" ? "default" : "outline"}
//                   size="sm"
//                   onClick={() => handlePreferenceChange("theme", "dark")}
//                   className="flex items-center gap-2"
//                 >
//                   <Moon className="h-4 w-4" />
//                   Dark
//                 </Button>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label className="text-sm font-medium">Language</Label>
//               <select
//                 value={settings.preferences.language}
//                 onChange={(e) => handlePreferenceChange("language", e.target.value)}
//                 className="w-full p-2 border rounded-md"
//               >
//                 <option value="en">English</option>
//                 <option value="bn">বাংলা</option>
//                 <option value="hi">हिंदी</option>
//               </select>
//             </div>

//             <div className="space-y-2">
//               <Label className="text-sm font-medium">Timezone</Label>
//               <select
//                 value={settings.preferences.timezone}
//                 onChange={(e) => handlePreferenceChange("timezone", e.target.value)}
//                 className="w-full p-2 border rounded-md"
//               >
//                 <option value="UTC">UTC</option>
//                 <option value="Asia/Dhaka">Asia/Dhaka</option>
//                 <option value="Asia/Kolkata">Asia/Kolkata</option>
//                 <option value="America/New_York">America/New_York</option>
//               </select>
//             </div>
//           </CardContent>
//         </Card>
//             <div className="flex items-center justify-between">
//               <div>
//                 <Label>Save Payment Methods</Label>
//                 <p className="text-sm text-gray-500">
//                   Save cards for faster checkout
//                 </p>
//               </div>
//               <Switch defaultChecked />
//             </div>
//             <div className="flex items-center justify-between">
//               <div>
//                 <Label>Payment Notifications</Label>
//                 <p className="text-sm text-gray-500">
//                   Get notified about payments
//                 </p>
//               </div>
//               <Switch defaultChecked />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="billing-address">Billing Address</Label>
//               <Input
//                 id="billing-address"
//                 defaultValue="123 Main St, New York, NY 10001"
//               />
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Preferences */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Event Preferences</CardTitle>
//           <CardDescription>
//             Customize your event browsing experience
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="favorite-sports">Favorite Sports</Label>
//                 <Input
//                   id="favorite-sports"
//                   defaultValue="Football, Cricket, Tennis"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="preferred-location">
//                   Preferred Event Location
//                 </Label>
//                 <Input id="preferred-location" defaultValue="New York" />
//               </div>
//             </div>
//             <div className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="price-range">Preferred Price Range</Label>
//                 <Input id="price-range" defaultValue="$50 - $200" />
//               </div>
//               <div className="flex items-center justify-between">
//                 <div>
//                   <Label>Weekend Events Only</Label>
//                   <p className="text-sm text-gray-500">
//                     Show only weekend events
//                   </p>
//                 </div>
//                 <Switch />
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
