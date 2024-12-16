<template>
  <div class="container mt-4">
    <div
      class="header d-flex justify-content-between align-items-center mb-3 p-3"
    >
      <h2 class="title">Liste des Paiements</h2>
      <router-link class="btn btn-add" :to="{ name: 'payment-add' }"
        >Ajouter</router-link
      >
    </div>
    <table class="table table-bordered table-hover">
      <thead class="table-light">
        <tr>
          <th>Nom</th>
          <th>Montant</th>
          <th>Méthode</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="payment in payments.sort((a, b) => a.id - b.id)"
          :key="payment.id"
        >
          <td>{{ payment.payer }}</td>
          <td>{{ payment.amount }} MRU</td>
          <td>{{ payment.paymentMode }}</td>
          <td class="text-center">
            <router-link
              class="action-icon"
              :to="{ name: 'payment-show', params: { id: payment.id } }"
            >
              <i class="fas fa-eye"></i>
            </router-link>
            <router-link
              class="action-icon"
              :to="{ name: 'payment-edit', params: { id: payment.id } }"
            >
              <i class="fas fa-edit"></i>
            </router-link>
            <button
              class="action-icon btn-delete"
              @click="deletePayment(payment.id)"
            >
              <i class="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
  <script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const payments = ref([]);

const loadPayments = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:3000/api/payments");
    payments.value = response.data.result;
  } catch (error) {
    console.error("Erreur lors du chargement des paiements:", error);
  }
};

const deletePayment = async (id) => {
  try {
    await axios.delete(`http://127.0.0.1:3000/api/payments/${id}`);
    alert("Paiement supprimé avec succès");
    payments.value = payments.value.filter((payment) => payment.id !== id);
  } catch (error) {
    console.error("Erreur lors de la suppression du paiement:", error);
  }
};

onMounted(loadPayments);
</script>
  
  <style scoped>
/* Styles pour la table */
.container {
  max-width: 1000px;
  margin: auto;
}

.table-hover tbody tr:hover {
  background-color: #f1f1f1;
}

.action-icon {
  color: #218838;
  margin: 0 8px;
  cursor: pointer;
}

.action-icon:hover {
  color: #1e7e34;
}

.btn-delete {
  color: #dc3545;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

.btn-delete:hover {
  color: #c82333;
}

.btn-add {
  background-color: #28a745;
  color: white;
}

.btn-add:hover {
  background-color: #218838;
}
</style>
  