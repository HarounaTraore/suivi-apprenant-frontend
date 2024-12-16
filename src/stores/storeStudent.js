import { defineStore } from "pinia";
import HTTP from "@/config.axios";
import { ref } from "vue";
import { Notyf } from "notyf"; 

const notyf = new Notyf(); 

export const storeStudent = defineStore("student", () => {
  const students = ref([]);
  const loadData = async () => {
    try {
      const { data } = await HTTP.get("students/");
      const result = data.result;
      students.value = result;
      return result;
    } catch (error) {
      notyf.error('Erreur lors du chargement des étudiants : ' + error.message);
      throw error;
    }
  };
  const findStudent = async (id) => {
    try {
      const { data } = await HTTP.get(`student/${id}`);
      const result = data.result;
      console.log(result);
      await loadData();
      return result;
    } catch (error) {
      notyf.error("Erreur lors de l'ajout de l'étudiant: " + error.message);
      throw error;
    }
  };
  const addStudent = async (fullName, email, tutor, address, phoneNumber) => {
    try {
      const result = await HTTP.post("student/", {
        fullName,
        email,
        tutor,
        address,
        phoneNumber,
      });
      await loadData();
      notyf.success("Étudiant ajouté avec succès!");
      return result;
    } catch (error) {
      notyf.error("Erreur lors de l'ajout de l'étudiant: " + error.message);
      throw error;
    }
  };

  const updateStudent = async (
    id,
    fullName,
    email,
    tutor,
    address,
    phoneNumber
  ) => {
    try {
      const { data } = await HTTP.put(`student/${id}`, {
        fullName,
        email,
        tutor,
        address,
        phoneNumber,
      });
      const result = data.result;
      await loadData();
      notyf.success("Étudiant mis à jour avec succès!");
      return result;
    } catch (error) {
      notyf.error("Erreur lors de la mise à jour de l'étudiant: " + error.message);
      throw error;
    }
  };

  const destroy = async (id) => {
    try {
      await HTTP.delete(`student/${id}`);

      await loadData();
      notyf.success("Étudiant supprimé avec succès!"); 
    } catch (error) {
      notyf.error("Erreur lors de la suppression de l'étudiant: " + error.message);
      throw error;
    }
  };
  return { students, loadData, addStudent, findStudent, updateStudent,destroy };
});
