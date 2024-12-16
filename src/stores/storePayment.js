import { defineStore } from "pinia";
import HTTP from "@/config.axios"; // Assurez-vous que l'instance HTTP est bien configurée
import { ref } from "vue";

export const storePayment = defineStore("payment", () => {
  const payments = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // Charger la liste des paiements
  const loadData = async () => {
    loading.value = true;
    try {
      const { data } = await HTTP.get("payments/");
      payments.value = data.result;
      return data.result;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Trouver un paiement par ID
  const findPayment = async (id) => {
    loading.value = true;
    try {
      const { data } = await HTTP.get(`payment/${id}`);
      const result = data.result;
      return result;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Ajouter un paiement
  const addPayment = async (paymentData) => {
    loading.value = true;
    try {
      const result = await HTTP.post("payment/", paymentData);
      await loadData();
      return result;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Mettre à jour un paiement
  const updatePayment = async (id, paymentData) => {
    loading.value = true;
    try {
      const { data } = await HTTP.put(`payment/${id}`, paymentData);
      await loadData();
      return data.result;
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  // Supprimer un paiement
  const destroy = async (id) => {
    loading.value = true;
    try {
      await HTTP.delete(`payment/${id}`);
      await loadData();
    } catch (err) {
      error.value = err;
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return { payments, loadData, addPayment, findPayment, updatePayment, destroy, loading, error };
});
