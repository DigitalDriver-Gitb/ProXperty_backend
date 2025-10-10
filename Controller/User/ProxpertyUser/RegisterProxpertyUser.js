// controllers/adminUserController.js
import express from 'express';
import ProxpertyUserModel from "../../../models/Users/UserRegisterModel.js";

export const getRegisteredProxpertyUsers = async (req, res) => {
  try {
    const registeredProxpertyUser = await ProxpertyUserModel.find();
    res.json(registeredProxpertyUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const deleteRegisteredProxpertyUser = async (req, res) => {
  try {
    const registeredProxpertyUser = await ProxpertyUserModel.findByIdAndDelete(req.params.id);
    res.json(registeredProxpertyUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};