import { Request, Response } from 'express';
import Country from '../models/Country';

interface MulterRequest extends Request {
  files?: {
    [fieldname: string]: Express.Multer.File[];
  } | Express.Multer.File[];
}

const parseJSONSafe = (data: any) => {
  if (!data) return undefined;
  if (typeof data === 'object') return data;
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
};

export const getAllCountries = async (req: Request, res: Response): Promise<void> => {
  try {
    const countries = await Country.find({});
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching countries', error: error instanceof Error ? error.message : error });
  }
};

export const getCountryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const country = await Country.findById(req.params.id);
    if (country) {
      res.status(200).json(country);
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching country', error: error instanceof Error ? error.message : error });
  }
};

export const deleteCountry = async (req: Request, res: Response): Promise<void> => {
  try {
    const country = await Country.findByIdAndDelete(req.params.id);
    if (country) {
      res.status(200).json({ message: 'Country removed' });
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting country', error: error instanceof Error ? error.message : error });
  }
};

export const createCountry = async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    const { countryName, countryCode, visaGrade, tagline } = req.body;
    let cardImage = '';
    let bannerImage = '';

    if (req.files && !Array.isArray(req.files)) {
      if (req.files['cardImage'] && req.files['cardImage'].length > 0) {
        cardImage = req.files['cardImage'][0].path;
      }
      if (req.files['bannerImage'] && req.files['bannerImage'].length > 0) {
        bannerImage = req.files['bannerImage'][0].path;
      }
    }

    const country = new Country({
      countryName,
      countryCode,
      visaGrade,
      tagline,
      cardImage,
      bannerImage,
      about: parseJSONSafe(req.body.about),
      visa: parseJSONSafe(req.body.visa),
      courses: parseJSONSafe(req.body.courses),
    });

    const createdCountry = await country.save();
    res.status(201).json(createdCountry);
  } catch (error) {
    res.status(500).json({ message: 'Server error creating country', error: error instanceof Error ? error.message : error });
  }
};

export const updateCountry = async (req: MulterRequest, res: Response): Promise<void> => {
  try {
    const { countryName, countryCode, visaGrade, tagline } = req.body;
    
    const country = await Country.findById(req.params.id);

    if (country) {
      country.countryName = countryName || country.countryName;
      country.countryCode = countryCode || country.countryCode;
      country.visaGrade = visaGrade || country.visaGrade;
      country.tagline = tagline || country.tagline;

      if (req.files && !Array.isArray(req.files)) {
        if (req.files['cardImage'] && req.files['cardImage'].length > 0) {
          country.cardImage = req.files['cardImage'][0].path;
        }
        if (req.files['bannerImage'] && req.files['bannerImage'].length > 0) {
          country.bannerImage = req.files['bannerImage'][0].path;
        }
      }

      if (req.body.about) country.about = parseJSONSafe(req.body.about);
      if (req.body.visa) country.visa = parseJSONSafe(req.body.visa);
      if (req.body.courses) country.courses = parseJSONSafe(req.body.courses);

      const updatedCountry = await country.save();
      res.status(200).json(updatedCountry);
    } else {
      res.status(404).json({ message: 'Country not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error updating country', error: error instanceof Error ? error.message : error });
  }
};
