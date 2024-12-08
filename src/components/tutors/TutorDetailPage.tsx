import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  MapPin, GraduationCap, BookOpen, Star, 
  Clock, DollarSign, User, Mail, Phone,
  Calendar, CheckCircle, Award
} from 'lucide-react';

const TutorDetailPage = () => {
  const { tutorId } = useParams();
  const [tutor, setTutor] = useState<any>(null);

  useEffect(() => {
    // Load tutor profile
    const loadTutor = () => {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('tutor_profile_')) {
          const profile = JSON.parse(localStorage.getItem(key) || '{}');
          if (profile.tutorId === tutorId) {
            setTutor(profile);
            break;
          }
        }
      }
    };

    loadTutor();
  }, [tutorId]);

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900">Tutor Not Found</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start space-x-8">
            <div className="w-40 h-40 rounded-xl bg-gray-100 overflow-hidden">
              {tutor.profileImage ? (
                <img 
                  src={tutor.profileImage} 
                  alt={tutor.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-indigo-100">
                  <GraduationCap className="w-20 h-20 text-indigo-600" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{tutor.name}</h1>
                  <p className="text-xl text-gray-600">{tutor.university}</p>
                  <p className="text-gray-500">{tutor.department}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Tutor ID</div>
                  <div className="text-lg font-mono font-medium text-indigo-600">{tutor.tutorId}</div>
                </div>
              </div>

              <div className="mt-6 flex items-center space-x-6">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{tutor.stats.ratings}</span>
                  <span className="ml-1 text-gray-500">({tutor.stats.reviews} reviews)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Eye className="w-5 h-5 mr-1" />
                  <span>{tutor.stats.profileViews} profile views</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 whitespace-pre-line">{tutor.about}</p>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
              <div className="space-y-6">
                {Object.entries(tutor.education).map(([level, details]: [string, any]) => (
                  <div key={level} className="flex items-start space-x-4">
                    <div className="p-2 bg-indigo-50 rounded-lg">
                      <GraduationCap className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{details.institute}</h3>
                      <p className="text-gray-500">{details.group} • {details.year}</p>
                      <p className="text-gray-500">Result: {details.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Teaching Experience */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Teaching Experience</h2>
              <div className="space-y-4">
                <p className="text-gray-600">{tutor.experience}</p>
                <div className="mt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Why Choose Me?</h3>
                  <p className="text-gray-600">{tutor.reasonsToHire}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tutoring Information</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>Location</span>
                  </div>
                  <span className="text-gray-900">{tutor.tutoring.livingLocation}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    <span>Experience</span>
                  </div>
                  <span className="text-gray-900">{tutor.tutoring.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-5 h-5 mr-2" />
                    <span>Expected Salary</span>
                  </div>
                  <span className="text-gray-900">{tutor.tutoring.expectedSalary} BDT/month</span>
                </div>
              </div>
            </div>

            {/* Preferred Subjects */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Subjects & Classes</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Preferred Subjects</h3>
                  <div className="flex flex-wrap gap-2">
                    {tutor.tutoring.preferredSubjects.map((subject: string) => (
                      <span key={subject} className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Preferred Classes</h3>
                  <div className="flex flex-wrap gap-2">
                    {tutor.tutoring.preferredClasses.map((className: string) => (
                      <span key={className} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        {className}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Availability</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Available Days</h3>
                  <div className="flex flex-wrap gap-2">
                    {tutor.tutoring.availableDays.map((day: string) => (
                      <span key={day} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="text-gray-900">
                    {tutor.tutoring.availableFrom} - {tutor.tutoring.availableTo}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Button */}
            <button className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Contact Tutor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailPage;