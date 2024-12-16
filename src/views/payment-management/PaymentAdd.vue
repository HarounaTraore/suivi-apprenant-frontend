<template>
  <div class="container mt-4">
    <div class="header d-flex justify-content-center align-items-center mb-3 p-3">
      <h2 class="title">Ajouter un Paiement</h2>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="form-group col-md-6 mb-3">
          <label for="payer">Payeur</label>
          <input
            type="text"
            id="payer"
            v-model="form.payer"
            class="form-control"
            placeholder="Nom du payeur"
            :class="{'is-invalid': errors.payer}"
          />
          <div v-if="errors.payer" class="invalid-feedback">{{ errors.payer }}</div>
        </div>

        <div class="form-group col-md-6 mb-3">
          <label for="payerNumber">Téléphone</label>
          <input
            type="text"
            id="payerNumber"
            v-model="form.payerNumber"
            class="form-control"
            placeholder="Numéro téléphone du payeur"
            :class="{'is-invalid': errors.payerNumber}"
          />
          <div v-if="errors.payerNumber" class="invalid-feedback">{{ errors.payerNumber }}</div>
        </div>
      </div>

      <div class="row">
        <div class="form-group col-md-6 mb-3">
          <label for="student">Apprenant</label>
          <select
            id="student"
            v-model="student"
            class="form-select"
            :class="{'is-invalid': errors.student}"
          >
            <option value="" disabled>Selectionner l'Apprenant</option>
            <option
              v-for="student in storeStudent().students"
              :key="student.id"
              :value="student.id"
            >
              {{ student.fullName }}
            </option>
          </select>
          <div v-if="errors.student" class="invalid-feedback">{{ errors.student }}</div>
        </div>

        <div class="form-group col-md-6 mb-3">
          <label for="registrationId">Module</label>
          <select
            id="registrationId"
            v-model="form.registrationId"
            class="form-select"
            :class="{'is-invalid': errors.registrationId}"
          >
            <option value="" disabled>Selectionner le Module</option>
            <option
              v-for="registration in filteredRegistrations"
              :key="registration.id"
              :value="registration.id"
            >
              {{ registration.module.name }}
            </option>
          </select>
          <div v-if="errors.registrationId" class="invalid-feedback">{{ errors.registrationId }}</div>
        </div>

        <div class="form-group col-md-6 mb-3">
          <label for="paymentMode">Méthode de Paiement</label>
          <select
            id="paymentMode"
            v-model="form.paymentMode"
            class="form-select"
            :class="{'is-invalid': errors.paymentMode}"
          >
            <option value="" disabled>Choisissez une méthode</option>
            <option value="Carte Bancaire">Carte Bancaire</option>
            <option value="Espèces">Espèces</option>
            <option value="Mobile Money">Mobile Money</option>
          </select>
          <div v-if="errors.paymentMode" class="invalid-feedback">{{ errors.paymentMode }}</div>
        </div>

        <div class="form-group col-md-6 mb-3">
          <label for="payerNumber">Montant</label>
          <input
            type="text"
            id="payerNumber"
            v-model="form.amount"
            class="form-control"
            placeholder="Numéro téléphone du payeur"
            :class="{'is-invalid': errors.amount}"
          />
          <div v-if="errors.payerNumber" class="invalid-feedback">{{ errors.payerNumber }}</div>
        </div>
      </div>

      <div class="d-flex justify-content-between">
        <router-link class="btn btn-cancel" :to="{ name: 'payment-list' }">Annuler</router-link>
        <button type="submit" class="btn btn-add">Ajouter</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { storePayment } from "@/stores/storePayment";
import { useRouter } from "vue-router";
import { storeRegistration } from "@/stores/storeRegistration";
import { storeStudent } from "@/stores/storeStudent";

const router = useRouter();
const store = storePayment();
const student = ref("");
const form = reactive({
  payer: "",
  amount: "",
  paymentMode: "",
  payerNumber: "",
  registrationId: "",
});
const errors = reactive({
  payer: "",
  payerNumber: "",
  student: "",
  registrationId: "",
  paymentMode: "",
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

onMounted(async () => {
  try {
    await storeRegistration().loadData();
    await storeStudent().loadData();
  } catch (error) {
    console.log("Erreur lors de chargement de données: ", error);
  }
});

const validateForm = () => {
  errors.payer = form.payer ? "" : "Le nom du payeur est requis.";
  
  if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(form.payer)) {
    errors.payer = "Le nom du payeur ne doit contenir que des lettres et des espaces.";
  }

  errors.payerNumber =
    form.payerNumber && /^\d{8}$/.test(form.payerNumber)
      ? ""
      : "Le numéro de téléphone est invalide (doit comporter 8 chiffres).";
  errors.student = student.value ? "" : "L'apprenant est requis.";
  errors.registrationId = form.registrationId ? "" : "Le module est requis.";
  errors.paymentMode = form.paymentMode ? "" : "La méthode de paiement est requise.";

  return !Object.values(errors).some((error) => error);
};

const handleSubmit = async () => {
  if (validateForm()) {
    try {
      await store.addPayment(form);
      router.push({ name: "payment-list" });
    } catch (error) {
      console.error("Erreur lors de l'ajout du paiement:", error);
    }
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
