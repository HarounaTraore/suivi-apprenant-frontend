import { defineStore } from "pinia";
import HTTP from "@/config.axios";
import { ref } from "vue";

export const storeRegistration = defineStore("registration", () => {
  const registrations = ref([]);
  const loadData = async () => {
    try {
      const { data } = await HTTP.get("registrations/");
      const result = data.result;
      registrations.value = result;

      return result;
    } catch (error) {
      throw error;
    }
  };
  const findRegistration = async (id) => {
    try {
      const { data } = await HTTP.get(`registration/${id}`);
      const result = data.result;
      console.log(result);
      await loadData();
      return result;
    } catch (error) {
      throw error;
    }
  };
  const addRegistration = async (
    dateRegister,
    startDate,
    studentId,
    moduleId
  ) => {
    try {
      const result = await HTTP.post("registration/", {
        dateRegister,
        startDate,
        studentId,
        moduleId,
      });
      await loadData();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const updateRegistration = async (
    id,
    dateRegister,
    startDate,
    studentId,
    moduleId,
    mount
  ) => {
    try {
      const { data } = await HTTP.put(`registration/${id}`, {
        dateRegister,
        startDate,
        studentId,
        moduleId,
        mount,
      });
      const result = data.result;
      await loadData();

      return result;
    } catch (error) {
      throw error;
    }
  };

  const destroy = async (id) => {
    try {
      await HTTP.delete(`registration/${id}`);
      await loadData();
    } catch (error) {
      throw error;
    }
  };
  return {
    registrations,
    loadData,
    addRegistration,
    findRegistration,
    updateRegistration,
    destroy,
  };
});
