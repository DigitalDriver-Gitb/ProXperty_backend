// controllers/adminUserController.js
import express from 'express';
import RegisterdAdminUsers from "../../../models/Admin/AdminUsers/RegisterdAdminUsers.js";

export const getRegisteredAdminUsers = async (req, res) => {
  try {
    const registeredAdminUsers = await RegisterdAdminUsers.find();
    res.json(registeredAdminUsers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteRegisteredAdminUser = async (req, res) => {
  try {
    const registeredAdminUser = await RegisterdAdminUsers.findByIdAndDelete(req.params.id);
    res.json(registeredAdminUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};