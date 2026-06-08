import mongoose, { Document, Schema } from 'mongoose';

export interface ICountry extends Document {
  countryName: string;
  countryCode: string;
  visaGrade?: string;
  tagline?: string;
  cardImage?: string;
  bannerImage?: string;
  about?: {
    salaryGuide?: { jobTitle: string; averageSalary: string }[];
    livingCost?: { rent: string; groceries: string; healthInsurance: string; totalCost: string };
    workCulture?: string;
    popularJobs?: string[];
    importantNotes?: string;
  };
  visa?: {
    visaProcess?: string[];
    requirements?: string[];
    rejectionReasons?: string[];
  };
  courses?: {
    coursesList?: { courseName: string; duration: string; tuitionFees: string }[];
  };
}

const CountrySchema: Schema = new Schema({
  countryName: { type: String, required: true },
  countryCode: { type: String, required: true },
  visaGrade: { type: String },
  tagline: { type: String },
  cardImage: { type: String },
  bannerImage: { type: String },
  about: {
    salaryGuide: [{ jobTitle: String, averageSalary: String }],
    livingCost: { rent: String, groceries: String, healthInsurance: String, totalCost: String },
    workCulture: String,
    popularJobs: [String],
    importantNotes: String,
  },
  visa: {
    visaProcess: [String],
    requirements: [String],
    rejectionReasons: [String],
  },
  courses: {
    coursesList: [{ courseName: String, duration: String, tuitionFees: String }],
  },
}, {
  timestamps: true
});

export default mongoose.model<ICountry>('Country', CountrySchema);
