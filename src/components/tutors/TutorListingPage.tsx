import React, { useEffect, useState } from 'react';
import { MapPin, GraduationCap, BookOpen, Star, Clock, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TutorProfile {
  id: string;
  tutorId: string;
  name: string;
  university: string;
  department: string;
  about: string;
  experience: string;
  reasonsToHire: string;
  profileImage?: string;
  education: {
    ssc: { institute: string; board: string; group: string; year: string; result: string };
    hsc: { institute: string; board: string; group: string; year: string; result: string };
    graduation: { institute: string; department: string; year: string; cgpa: string };
  };
  tutoring: {
    livingCountry: string;
    livingCity: string;
    livingLocation: string;
    preferredLocations: string[];
    preferredCategories: string[];
    preferredClasses: string[];
    preferredSubjects: string[];
    preferredMethods: string[];
    availableDays: string[];
    availableFrom: string;
    availableTo: string;
    experience: string;
    expectedSalary: string;
  };
  stats: {
    profileViews: number;
    ratings: number;
    reviews: number;
  };
}

const TutorListingPage = () => {
  const [tutors, setTutors] = useState<TutorProfile[]>([]);
  const [filter, setFilter] = useState({
    subject: '',
    location: '',
    university: '',
    gender: ''
  });

  useEffect(() => {
    loadTutors();
  }, []);

  const loadTutors = () => {
    const tutorProfiles: TutorProfile[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('tutor_profile_')) {
        const profile = JSON.parse(localStorage.getItem(key) || '{}');
        if (profile.status === 'verified' && profile.tutoring) {
          tutorProfiles.push(profile);
        }
      }
    }
    setTutors(tutorProfiles);
  };

  const filteredTutors = tutors.filter(tutor => {
    if (filter.subject && !tutor.tutoring?.preferredSubjects?.includes(filter.subject)) {
      return false;
    }
    if (filter.location && !tutor.tutoring?.livingLocation?.toLowerCase().includes(filter.location.toLowerCase())) {
      return false;
    }
    if (filter.university && !tutor.university?.toLowerCase().includes(filter.university.toLowerCase())) {
      return false;
    }
    if (filter.gender && tutor.gender !== filter.gender) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Our Tutors</h1>
          <p className="mt-4 text-gray-600">Find the perfect tutor for your needs</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <select
                value={filter.subject}
                onChange={(e) => setFilter(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full rounded-lg border-gray-300"
              >
                <option value="">All Subjects</option>
                <option value="mathematics">Mathematics</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                value={filter.location}
                onChange={(e) => setFilter(prev => ({ ...prev, location: e.target.value }))}
                className="w-full rounded-lg border-gray-300"
              >
                <option value="">All Locations</option>
                <option value="dhaka">Dhaka</option>
                <option value="chittagong">Chittagong</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
              <select
                value={filter.university}
                onChange={(e) => setFilter(prev => ({ ...prev, university: e.target.value }))}
                className="w-full rounded-lg border-gray-300"
              >
                <option value="">All Universities</option>
                <option value="du">Dhaka University</option>
                <option value="buet">BUET</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                value={filter.gender}
                onChange={(e) => setFilter(prev => ({ ...prev, gender: e.target.value }))}
                className="w-full rounded-lg border-gray-300"
              >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tutor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map((tutor) => (
            <div key={tutor.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="p-6">
                {/* Profile Header */}
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-24 rounded-full bg-gray-100 overflow-hidden">
                    {tutor.profileImage ? (
                      <img 
                        src={tutor.profileImage} 
                        alt={tutor.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-indigo-100">
                        <GraduationCap className="w-12 h-12 text-indigo-600" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{tutor.name}</h3>
                    <p className="text-gray-500">{tutor.university}</p>
                    <p className="text-sm text-gray-500">{tutor.department}</p>
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{tutor.stats?.ratings || 0}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-600">{tutor.stats?.reviews || 0} reviews</span>
                    </div>
                  </div>
                </div>

                {/* Quick Info */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{tutor.tutoring?.livingLocation || 'Location not set'}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{tutor.tutoring?.experience || 'No experience'}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <BookOpen className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{tutor.tutoring?.preferredSubjects?.join(', ') || 'No subjects'}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-sm">{tutor.tutoring?.expectedSalary || 'Not specified'} BDT/month</span>
                  </div>
                </div>

                {/* View Profile Button */}
                <Link 
                  to={`/tutors/${tutor.tutorId}`}
                  className="mt-6 block w-full py-2 bg-indigo-600 text-white text-center rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  View Full Profile
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredTutors.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900">No Tutors Found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your filters or check back later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorListingPage;