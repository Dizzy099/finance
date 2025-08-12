import { Page } from "../models/page.model.js";    

// Get Home Page
export const getHomePage = async (req, res) => {
    const page = await Page.findOne({ name: "home" });
    res.status(200).json({ message: "Welcome to the Home Page", page });
};

export const getAboutPage = async (req, res) => {
    const page = await Page.findOne({ name: "about" });
    res.status(200).json({ message: "About Us Page", page });
};

  