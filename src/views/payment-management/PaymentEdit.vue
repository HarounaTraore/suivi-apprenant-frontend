<template>

  <div class="container mt-4">
    <div
      class="header d-flex justify-content-center align-items-center mb-3 p-3"
    >
      <h2 class="title">Modification d'un Paiement</h2>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="form-group col-md-6 mb-3">
          <label for="name">Payeur</label>
          <input
            type="text"
            id="name"
            v-model="form.payer"
            class="form-control"
            placeholder="Nom du payeur"
            required
          />
        </div>

        <div class="form-group col-md-6 mb-3">
          <label for="name">Telephone</label>
          <input
            type="text"
            id="name"
            v-model="form.payerNumber"
            class="form-control"
            placeholder="Numero telephone du payeur"
            required
          />
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-6 mb-3">
          <label for="name">Apprénant</label>
          <select
            type="text"
            id="name"
            v-model="student"
            class="form-select"
            required
          >
            <option value="" disabled>Selectionner l' Apprénant</option>
            <option
              v-for="student in storeStudent().students"
              :key="student.id"
              :value="student.id"
            >
              {{ student.fullName }}
            </option>
          </select>
        </div>
        <div class="form-group col-md-6 mb-3">
          <label for="name">Module</label>
          <select
            type="text"
            id="name"
            v-model="form.registrationId"
            class="form-select"
            required
          >
            <option value="" disabled>Selection le Module</option>
            <option
              v-for="registration in filteredRegistrations"
              :key="registration.id"
              :value="registration.id"
            >
              {{ registration.module.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group mb-3">
        <label for="amount">Montant</label>
        <input
          type="number"
          id="amount"
          v-model="form.amount"
          class="form-control"
          placeholder="Montant (en MRU)"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="method">Méthode</label>
        <select
          id="method"
          v-model="form.paymentMode"
          class="form-select"
          required
        >
          <option value="" disabled>Choisissez une méthode</option>
          <option value="Carte Bancaire">Carte Bancaire</option>
          <option value="Espèces">Espèces</option>
          <option value="Mobile Money">Mobile Money</option>
        </select>
      </div>
      <div class="d-flex justify-content-between">
        <router-link class="btn btn-cancel" :to="{ name: 'payment-list' }"
          >Annuler</router-link
        >
        <button type="submit" class="btn btn-add">Enregistrer</button>
      </div>
    </form></div>
</template>

<script setup>

import { onMounted, ref, watch } from "vue";
import { storePayment } from "@/stores/storePayment";
import { useRoute } from "vue-router";
import { storeRegistration } from "@/stores/storeRegistration";
import { storeStudent } from "@/stores/storeStudent";
import router from "@/router";

const store = storePayment();
const student = ref("");

const form = ref({
  payer: "",
  amount: "",
  paymentMode: "",
  payerNumber: "",
  registrationId: "",
});

const filteredRegistrations = ref([]);

const filterRegistrations = () => {
  const allRegistrations = storeRegistration().registrations;
  filteredRegistrations.value = allRegistrations.filter(
    (registration) => registration.studentId === Number(student.value)
  );
};

watch(student, () => {
  filterRegistrations();
});

const id = useRoute().params.id;

onMounted(async () => {
  try {
    await storeRegistration().loadData();
    await storeStudent().loadData();
    const result = await store.findPayment(id);
    form.value = { ...result };
    student.value = result.registration.student.id;
    console.log(form.value);
  } catch (error) {
    console.log("Erreur lors de chargement de données: ", error);
  }
});

const handleSubmit = async () => {
  try {
    await store.updatePayment(id, form.value);
    router.push({ name: "payment-list" });
  } catch (error) {
    console.error("Erreur lors de l'ajout du paiement:", error);
  }
};
</script>


<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header {
  background-color: #f5f5dc;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.title {
  font-size: 1.5rem;
  margin: 0;
  color: #218838;
}

.form-group label {
  font-weight: bold;
  color: #495057;
}

.form-control,
.form-select {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
}

.form-control:focus,
.form-select:focus {
  border-color: #218838;
  box-shadow: 0 0 5px rgba(33, 136, 56, 0.5);
}

.btn-add {
  font-size: 1rem;
  padding: 10px 20px;
  background-color: #218838;
  color: white;
  border: 1px solid #218838;
  border-radius: 5px;
  cursor: pointer;
}

.btn-add:hover {
  background-color: #1e7e34;
}

.btn-cancel {
  font-size: 1rem;
  padding: 10px 20px;
  background-color: white;
  color: #dc3545;
  border: 1px solid #dc3545;
  border-radius: 5px;
  text-decoration: none;
}

.btn-cancel:hover {
  background-color: #dc3545;
  color: white;
}
</style>
