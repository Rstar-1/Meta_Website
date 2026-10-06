import axiosInstance from "./server/axiosInstance";
import { handleRequest } from "./server/apiHandler";

// ================= GET ALL CMS SECTIONS =================
export const getCmsSections = (params = {}) =>
  handleRequest(() => axiosInstance.get("/cms", { params }));

// ================= GET CMS SECTION BY ID =================
export const getCmsSectionById = (id) =>
  handleRequest(() => axiosInstance.get(`/cms/${id}`));

// ================= CREATE CMS SECTION =================
export const createCmsSection = (data) =>
  handleRequest(() => axiosInstance.post("/cms", data));

// ================= UPDATE CMS SECTION =================
export const updateCmsSection = (id, data) =>
  handleRequest(() => axiosInstance.put(`/cms/${id}`, data));

// ================= DELETE CMS SECTION =================
export const deleteCmsSection = (id) =>
  handleRequest(() => axiosInstance.delete(`/cms/${id}`));
