import api from "./api.js";

const previewImport = async ({ rawText, tahunPeriode, semesterKe }) => {
  const { data } = await api.post("/matkul/import/preview", {
    rawText,
    tahunPeriode,
    ...(semesterKe ? { semesterKe: Number(semesterKe) } : {}),
  });
  return data;
};

const confirmImport = async (dataArray) => {
  const { data } = await api.post("/matkul/import/confirm", { data: dataArray });
  return data;
};

export { previewImport, confirmImport };