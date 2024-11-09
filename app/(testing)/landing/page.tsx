"use client";

import { useState, useEffect, ChangeEvent, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import {
  PlusCircle,
  X,
  Edit,
  Save,
  Upload,
  FileDown,
  LayoutTemplate,
  UserCircle,
  FileOutput,
} from "lucide-react";
import { cn } from "@/lib/utils";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface WorkExperience {
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

interface Education {
  degree: string;
  institution: string;
  location: string;
  graduationYear: string;
}

interface CVData {
  name: string;
  title: string;
  profileImage: string;
  address: string;
  phone: string;
  email: string;
  profile: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  languages: { language: string; level: string }[];
  hobbies: string[];
}

const templates = [
  { name: "Classic", className: "bg-white text-gray-800 font-serif" },
  { name: "Modern", className: "bg-gray-100 text-gray-800 font-sans" },
  { name: "Minimalist", className: "bg-white text-gray-900 font-sans" },
  {
    name: "Creative",
    className:
      "bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 text-white font-sans",
  },
  { name: "Professional", className: "bg-gray-900 text-white font-serif" },
  { name: "Elegant", className: "bg-beige text-brown font-serif" },
  { name: "Tech", className: "bg-black text-green-400 font-mono" },
  { name: "Artistic", className: "bg-indigo-100 text-indigo-900 font-cursive" },
  { name: "Corporate", className: "bg-blue-900 text-white font-sans" },
  {
    name: "Vibrant",
    className:
      "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white font-sans",
  },
  { name: "Nature", className: "bg-green-100 text-green-800 font-sans" },
  { name: "Ocean", className: "bg-blue-100 text-blue-800 font-sans" },
  {
    name: "Sunset",
    className:
      "bg-gradient-to-r from-orange-300 to-red-600 text-white font-sans",
  },
  { name: "Monochrome", className: "bg-gray-200 text-gray-800 font-mono" },
  { name: "Pastel", className: "bg-pink-100 text-pink-800 font-sans" },
  { name: "Neon", className: "bg-black text-neon-green font-sans" },
  { name: "Vintage", className: "bg-sepia text-brown font-serif" },
  { name: "Futuristic", className: "bg-gray-900 text-cyan-400 font-sans" },
  { name: "Earthy", className: "bg-brown-100 text-brown-800 font-serif" },
  { name: "Geometric", className: "bg-white text-gray-800 font-sans" },
  { name: "Minimal Dark", className: "bg-gray-900 text-gray-100 font-sans" },
  {
    name: "Gradient Blue",
    className:
      "bg-gradient-to-r from-blue-400 to-blue-600 text-white font-sans",
  },
  {
    name: "Soft Neutrals",
    className: "bg-neutral-100 text-neutral-800 font-serif",
  },
  { name: "Bold Red", className: "bg-red-600 text-white font-sans" },
  { name: "Emerald", className: "bg-emerald-100 text-emerald-800 font-sans" },
  { name: "Lavender", className: "bg-purple-100 text-purple-800 font-serif" },
  { name: "Sunshine", className: "bg-yellow-100 text-yellow-800 font-sans" },
  { name: "Midnight", className: "bg-indigo-900 text-indigo-100 font-sans" },
  { name: "Forest", className: "bg-green-900 text-green-100 font-serif" },
  { name: "Coral", className: "bg-coral text-white font-sans" },
];

export default function CVTemplate() {
  const [step, setStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [cvData, setCVData] = useState<CVData>({
    name: "Remy Bertrand",
    title: "Sales manager",
    profileImage: "/placeholder.svg?height=150&width=150",
    address: "15, boulevard Admiral Courbet 69600 OULLINS",
    phone: "0485435365",
    email: "JosephFavreau@gmail.com",
    profile:
      "Dynamic sales manager with more than X years of experience in sales and team management. Strong business development, negotiation and key account management skills. Proven ability to achieve sales targets and significantly increase revenue. Results oriented, motivated and focused on customer satisfaction.",
    workExperience: [
      {
        position: "Sales Manager",
        company: "Company ABC",
        location: "City, Country",
        startDate: "January 20XX",
        endDate: "Present",
        responsibilities: [
          "Lead a team of X sales reps",
          "Develop and implement sales strategies to meet and exceed monthly and annual sales targets",
          "Build strong relationships with existing customers and key accounts",
          "Negotiate contracts and agreements with clients",
          "Prepare sales reports, performance analysis",
        ],
      },
    ],
    education: [
      {
        degree: "Bachelor of Business Administration",
        institution: "XYZ University",
        location: "City, Country",
        graduationYear: "Year of graduation",
      },
    ],
    skills: [
      "Sales management",
      "Business development",
      "Commercial negotiating",
      "Key account management",
      "Leadership and team management",
      "Customer service",
      "Market analysis",
      "Sales forecast",
    ],
    languages: [
      { language: "French", level: "Native" },
      { language: "English", level: "Level B2" },
    ],
    hobbies: ["Soccer", "Car race", "Camping"],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section?: keyof CVData,
    index?: number,
    subfield?: string
  ) => {
    const { name, value } = e.target;
    setCVData((prev) => {
      if (section && typeof index === "number") {
        if (subfield) {
          return {
            ...prev,
            [section]: prev[section].map((item: any, i: number) =>
              i === index
                ? { ...item, [subfield]: { ...item[subfield], [name]: value } }
                : item
            ),
          };
        } else {
          return {
            ...prev,
            [section]: prev[section].map((item: any, i: number) =>
              i === index ? { ...item, [name]: value } : item
            ),
          };
        }
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  const addItem = (section: keyof CVData) => {
    setCVData((prev) => {
      const newItem =
        section === "workExperience"
          ? {
              position: "",
              company: "",
              location: "",
              startDate: "",
              endDate: "",
              responsibilities: [],
            }
          : section === "education"
          ? { degree: "", institution: "", location: "", graduationYear: "" }
          : section === "languages"
          ? { language: "", level: "" }
          : "";
      return { ...prev, [section]: [...prev[section], newItem] };
    });
  };

  const removeItem = (section: keyof CVData, index: number) => {
    setCVData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const addResponsibility = (expIndex: number) => {
    setCVData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((exp, i) =>
        i === expIndex
          ? { ...exp, responsibilities: [...exp.responsibilities, ""] }
          : exp
      ),
    }));
  };

  const removeResponsibility = (expIndex: number, respIndex: number) => {
    setCVData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((exp, i) =>
        i === expIndex
          ? {
              ...exp,
              responsibilities: exp.responsibilities.filter(
                (_, j) => j !== respIndex
              ),
            }
          : exp
      ),
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCVData((prev) => ({
          ...prev,
          profileImage: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const toggleEditMode = () => {
    setIsEditing((prev) => !prev);
  };

  const exportToPDF = async () => {
    if (cvRef.current) {
      const content = cvRef.current;
      const canvas = await html2canvas(content, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: content.scrollWidth,
        windowHeight: content.scrollHeight,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      if (!isExporting) {
        pdf.save("cv.pdf");
      }
    } else {
      console.error("CV content not found");
    }
  };

  const exportAndPrint = async () => {
    setIsExporting(true);

    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 1000);
  };

  const getFieldStyle = () => {
    return !isEditing ? { backgroundColor: "transparent", border: "none" } : {};
  };

  return (
    <div className="container mx-auto p-4">
      {!isExporting && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={cn(
                  "w-1/2 h-2 rounded-full",
                  s === step ? "bg-primary" : "bg-gray-200",
                  s < step && "bg-primary"
                )}
              />
            ))}
          </div>
          <div className="flex justify-between">
            <span
              className={cn(
                "font-bold flex items-center",
                step === 1 && "text-primary"
              )}
            >
              <LayoutTemplate className="w-5 h-5 mr-2" />
              Choose Template
            </span>
            <span
              className={cn(
                "font-bold flex items-center",
                step === 2 && "text-primary"
              )}
            >
              <UserCircle className="w-5 h-5 mr-2" />
              Edit Information
            </span>
          </div>
        </div>
      )}

      {!isExporting && step === 1 && (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {templates.map((template, index) => (
              <Card
                key={index}
                className={cn(
                  "cursor-pointer",
                  template.className,
                  selectedTemplate === index && "ring-2 ring-primary"
                )}
                onClick={() => setSelectedTemplate(index)}
              >
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold mb-2">{template.name}</h3>
                  <div className="w-full h-32 bg-gray-200 mb-2 flex flex-col justify-between p-2 text-xs">
                    <div className="font-bold">John Doe</div>
                    <div>Software Engineer</div>
                    <div className="text-right">john@example.com</div>
                  </div>
                  <div className="w-full h-16 bg-gray-300"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}

      {step === 2 && (
        <>
          {!isExporting && (
            <div className="flex justify-end mb-4">
              <Button onClick={toggleEditMode} variant="default">
                {isEditing ? (
                  <Save className="mr-2 h-4 w-4" />
                ) : (
                  <Edit className="mr-2 h-4 w-4" />
                )}
                {isEditing ? "Save" : "Edit"}
              </Button>
            </div>
          )}
          <div
            ref={cvRef}
            className={cn(
              "max-w-5xl mx-auto",
              templates[selectedTemplate].className
            )}
            style={{ maxWidth: "210mm" }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Left Column */}
              <div className="w-full md:w-1/3 p-6">
                <div className="flex flex-col items-center mb-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <Image
                      src={cvData.profileImage}
                      alt="Profile"
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col items-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="sr-only"
                      id="image-upload"
                      ref={fileInputRef}
                    />
                    {!isExporting && (
                      <Button onClick={triggerImageUpload} variant="default">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Image
                      </Button>
                    )}
                  </div>
                </div>

                <section className="mb-6">
                  <h2 className="text-xl font-bold mb-4">CONTACT</h2>
                  <div className="space-y-2">
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={cvData.address}
                        onChange={handleInputChange}
                        className="w-full"
                        readOnly={!isEditing}
                        style={getFieldStyle()}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={cvData.phone}
                        onChange={handleInputChange}
                        className="w-full"
                        readOnly={!isEditing}
                        style={getFieldStyle()}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        value={cvData.email}
                        onChange={handleInputChange}
                        className="w-full"
                        readOnly={!isEditing}
                        style={getFieldStyle()}
                      />
                    </div>
                  </div>
                </section>

                <section className="mb-6">
                  <h2 className="text-xl font-bold mb-4">SKILLS</h2>
                  {cvData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <Input
                        value={skill}
                        onChange={(e) => handleInputChange(e, "skills", index)}
                        className="w-full mr-2"
                        readOnly={!isEditing}
                        style={getFieldStyle()}
                      />
                      {isEditing && (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => removeItem("skills", index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <Button
                      onClick={() => addItem("skills")}
                      className="w-full mt-2"
                      variant="default"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Skill
                    </Button>
                  )}
                </section>

                <section className="mb-6">
                  <h2 className="text-xl font-bold mb-4">LANGUAGES</h2>
                  {cvData.languages.map((lang, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <Input
                        value={lang.language}
                        onChange={(e) =>
                          handleInputChange(e, "languages", index, "language")
                        }
                        className="w-full mr-2"
                        placeholder="Language"
                        readOnly={!isEditing}
                        style={getFieldStyle()}
                      />
                      <Input
                        value={lang.level}
                        onChange={(e) =>
                          handleInputChange(e, "languages", index, "level")
                        }
                        className="w-full mr-2"
                        placeholder="Level"
                        readOnly={!isEditing}
                        style={getFieldStyle()}
                      />
                      {isEditing && (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => removeItem("languages", index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <Button
                      onClick={() => addItem("languages")}
                      className="w-full mt-2"
                      variant="default"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Language
                    </Button>
                  )}
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-4">HOBBIES</h2>
                  {cvData.hobbies.map((hobby, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <Input
                        value={hobby}
                        onChange={(e) => handleInputChange(e, "hobbies", index)}
                        className="w-full mr-2"
                        readOnly={!isEditing}
                        style={getFieldStyle()}
                      />
                      {isEditing && (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => removeItem("hobbies", index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <Button
                      onClick={() => addItem("hobbies")}
                      className="w-full mt-2"
                      variant="default"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Hobby
                    </Button>
                  )}
                </section>
              </div>

              {/* Right Column */}
              <div className="flex-1 p-6">
                <header className="mb-6">
                  <Input
                    name="name"
                    value={cvData.name}
                    onChange={handleInputChange}
                    className="text-4xl font-bold mb-2"
                    readOnly={!isEditing}
                    style={getFieldStyle()}
                  />
                  <Input
                    name="title"
                    value={cvData.title}
                    onChange={handleInputChange}
                    className="text-xl text-gray-600"
                    readOnly={!isEditing}
                    style={getFieldStyle()}
                  />
                </header>

                <section className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">PROFILE</h2>
                  <Textarea
                    name="profile"
                    value={cvData.profile}
                    onChange={handleInputChange}
                    className="w-full"
                    rows={4}
                    readOnly={!isEditing}
                    style={getFieldStyle()}
                  />
                </section>

                <section className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">
                    PROFESSIONAL EXPERIENCE
                  </h2>
                  {cvData.workExperience.map((exp, index) => (
                    <div key={index} className="mb-4 border p-4 rounded">
                      <div className="flex justify-between items-start mb-2">
                        <div className="w-full">
                          <Input
                            name="position"
                            value={exp.position}
                            onChange={(e) =>
                              handleInputChange(e, "workExperience", index)
                            }
                            className="font-bold mb-2"
                            placeholder="Position"
                            readOnly={!isEditing}
                            style={getFieldStyle()}
                          />
                          <div className="flex gap-2 mb-2">
                            <Input
                              name="company"
                              value={exp.company}
                              onChange={(e) =>
                                handleInputChange(e, "workExperience", index)
                              }
                              className="text-gray-600"
                              placeholder="Company"
                              readOnly={!isEditing}
                              style={getFieldStyle()}
                            />
                            <Input
                              name="location"
                              value={exp.location}
                              onChange={(e) =>
                                handleInputChange(e, "workExperience", index)
                              }
                              className="text-gray-600"
                              placeholder="Location"
                              readOnly={!isEditing}
                              style={getFieldStyle()}
                            />
                          </div>
                          <div className="flex gap-2 mb-2">
                            <Input
                              name="startDate"
                              value={exp.startDate}
                              onChange={(e) =>
                                handleInputChange(e, "workExperience", index)
                              }
                              className="text-gray-600"
                              placeholder="Start Date"
                              readOnly={!isEditing}
                              style={getFieldStyle()}
                            />
                            <Input
                              name="endDate"
                              value={exp.endDate}
                              onChange={(e) =>
                                handleInputChange(e, "workExperience", index)
                              }
                              className="text-gray-600"
                              placeholder="End Date"
                              readOnly={!isEditing}
                              style={getFieldStyle()}
                            />
                          </div>
                        </div>
                        {isEditing && (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => removeItem("workExperience", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <ul className="list-disc list-inside text-gray-700">
                        {exp.responsibilities.map((resp, respIndex) => (
                          <li
                            key={respIndex}
                            className="flex items-center mb-2"
                          >
                            <Input
                              value={resp}
                              onChange={(e) => {
                                const newResp = [...exp.responsibilities];
                                newResp[respIndex] = e.target.value;
                                handleInputChange(
                                  {
                                    target: {
                                      name: "responsibilities",
                                      value: newResp,
                                    },
                                  } as any,
                                  "workExperience",
                                  index
                                );
                              }}
                              className="w-full mr-2"
                              readOnly={!isEditing}
                              style={getFieldStyle()}
                            />
                            {isEditing && (
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() =>
                                  removeResponsibility(index, respIndex)
                                }
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </li>
                        ))}
                      </ul>
                      {isEditing && (
                        <Button
                          onClick={() => addResponsibility(index)}
                          className="mt-2"
                          variant="default"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" /> Add
                          Responsibility
                        </Button>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <Button
                      onClick={() => addItem("workExperience")}
                      className="w-full mt-2"
                      variant="default"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Work
                      Experience
                    </Button>
                  )}
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-4">EDUCATION</h2>
                  {cvData.education.map((edu, index) => (
                    <div key={index} className="mb-4 border p-4 rounded">
                      <div className="flex justify-between items-start mb-2">
                        <div className="w-full">
                          <Input
                            name="degree"
                            value={edu.degree}
                            onChange={(e) =>
                              handleInputChange(e, "education", index)
                            }
                            className="font-bold mb-2"
                            placeholder="Degree"
                            readOnly={!isEditing}
                            style={getFieldStyle()}
                          />
                          <div className="flex gap-2 mb-2">
                            <Input
                              name="institution"
                              value={edu.institution}
                              onChange={(e) =>
                                handleInputChange(e, "education", index)
                              }
                              className="text-gray-600"
                              placeholder="Institution"
                              readOnly={!isEditing}
                              style={getFieldStyle()}
                            />
                            <Input
                              name="location"
                              value={edu.location}
                              onChange={(e) =>
                                handleInputChange(e, "education", index)
                              }
                              className="text-gray-600"
                              placeholder="Location"
                              readOnly={!isEditing}
                              style={getFieldStyle()}
                            />
                          </div>
                          <Input
                            name="graduationYear"
                            value={edu.graduationYear}
                            onChange={(e) =>
                              handleInputChange(e, "education", index)
                            }
                            className="text-gray-600"
                            placeholder="Graduation Year"
                            readOnly={!isEditing}
                            style={getFieldStyle()}
                          />
                        </div>
                        {isEditing && (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => removeItem("education", index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {isEditing && (
                    <Button
                      onClick={() => addItem("education")}
                      className="w-full mt-2"
                      variant="default"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" /> Add Education
                    </Button>
                  )}
                </section>
              </div>
            </div>
            {!isExporting && (
              <div className="mt-8 text-center">
                <Button
                  onClick={exportAndPrint}
                  className="text-lg"
                  variant="default"
                >
                  <FileDown className="mr-2 h-6 w-6" /> Export and Print
                </Button>
              </div>
            )}
          </div>
        </>
      )}

      {!isExporting && (
        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <Button onClick={() => setStep(step - 1)} variant="default">
              Previous
            </Button>
          )}
          {step < 2 ? (
            <Button
              onClick={() => setStep(step + 1)}
              className="ml-auto"
              variant="default"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={() => setStep(1)}
              className="ml-auto"
              variant="default"
            >
              Start Over
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
