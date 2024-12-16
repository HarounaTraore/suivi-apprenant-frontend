import { defineStore } from "pinia";
import HTTP from "@/config.axios";
import { ref } from "vue";

export const storeModule = defineStore("module", () => {
  const modules = ref([]);
  const loadData = async () => {
    try {
      const { data } = await HTTP.get("modules/");
      const result = data.result;
      modules.value = result;
      return result;
    } catch (error) {
      throw error;
    }
  };
  const findModule = async (id) => {
    try {
      const { data } = await HTTP.get(`module/${id}`);
      const result = data.result;
      console.log(result);
      await loadData();
      return result;
    } catch (error) {
      throw error;
    }
  };
  const addModule = async (name, duration, price, status) => {
    try {
      const result = await HTTP.post("module/", {
        name,
        duration,
        price,
        status,
      });
      await loadData();
      return result;
    } catch (error) {
      throw error;
    }
  };

  const updateModule = async (id, name, duration, price, status) => {
    try {
      const { data } = await HTTP.put(`module/${id}`, {
        name,
        duration,
        price,
        status,
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
      await HTTP.delete(`module/${id}`);
      await loadData();
    } catch (error) {
      throw error;
    }
  };
  return { modules, loadData, addModule, findModule, updateModule, destroy };
});
