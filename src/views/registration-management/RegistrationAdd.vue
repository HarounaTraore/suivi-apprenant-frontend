<template>
  <div class="container mt-4">
    <div
      class="header d-flex align-items-center justify-content-center mb-3 p-3"
    >
      <h2 class="title">Ajouter une nouvelle Inscription</h2>
    </div>
    <form @submit.prevent="newregistration" class="styled-form">

        <div class=" mb-3">
          <label class="form-label">Date d'inscription:</label>
          <input
            v-model="registration.dateRegister"
            required
            class="form-control form-control-sm"
            type="date"
          />
        </div>
        <div class=" mb-3">
          <label class="form-label">Date debut:</label>
          <input
            v-model="registration.startDate"
            required
            class="form-control form-control-sm"
            type="date"
          />
        </div>
   
  
      <div class="mb-3">
        <select
          v-model="registration.studentId"
          required
          class="form-control form-control-sm"
        >
          <option disabled value="">Selectionner un Apprénant</option>
          <option
            v-for="student in storeStudent().students"
            :value="student.id"
            :key="student.id"
          >
            {{ student.fullName }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label class="form-label">Module:</label>
        <select
          v-model="registration.moduleId"
          required
          class="form-control form-control-sm"
        >
          <option disabled value="">Selectionner une module</option>
          <option
            v-for="module in storeModule().modules"
            :value="module.id"
            :key="module.id"
          >
            {{ module.name }}
          </option>
        </select>
      </div>
      <div class="d-flex justify-content-between mt-4">
        <button type="submit" class="btn btn-primary flex-grow-1 me-2">
          Enregistrer
        </button>
        <button
          type="button"
          @click="router.push({ name: 'registration-list' })"
          class="btn btn-cancel flex-grow-1"
        >
          Annuler
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import router from "@/router";
import { storeModule } from "@/stores/storeModule";
import { storeRegistration } from "@/stores/storeRegistration";
import { storeStudent } from "@/stores/storeStudent";
import { onMounted, ref } from "vue";
const store = storeRegistration();
const registration = ref({
  dateRegister: "",
  startDate: "",
  studentId: "",
  moduleId: "",
});
onMounted(async () => {
  try {
    await storeModule().loadData();
    await storeStudent().loadData();
  } catch (error) {
    console.log("Erreur lors de chargment de données, ", error);
  }
});
const newregistration = async () => {
  try {
    await store.addRegistration(
      registration.value.dateRegister,
      registration.value.startDate,
      registration.value.studentId,
      registration.value.moduleId,
    );
    router.push({ name: "registration-list" });
  } catch (error) {
    console.log("Erreur lors de l'ajout d'un apprenent: ", error);
  }
};
</script>



<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

.header {
  background-color: #f5f5dc;
  border-radius: 8px;
  padding: 10px 20px;
  text-align: center;
}

.title {
  font-size: 1.4rem;
  color: #218838;
}

.styled-form {
  background: white;
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-label {
  font-size: 0.9rem;
  color: #333;
}

.form-control-sm {
  border-radius: 5px;
  padding: 0.4rem 0.75rem;
  border: 1px solid #ddd;
}

.btn-primary {
  background-color: #218838;
  border-color: #218838;
  color: white;
  font-weight: bold;
}

.btn-primary:hover {
  background-color: #1e7e34;
  border-color: #1e7e34;
}

.btn-cancel {
  background-color: transparent;
  color: #218838;
  border: 1px solid #218838;
  font-weight: bold;
}

.btn-cancel:hover {
  background-color: #218838;
  color: white;
}
</style>