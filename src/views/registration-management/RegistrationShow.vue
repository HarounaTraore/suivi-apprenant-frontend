<template>
  <div class="container mt-4">
    <div
      class="header d-flex align-items-center justify-content-center mb-3 p-3"
    >
      <h2 class="title">Affichage</h2>
    </div>
    <form @submit.prevent="" class="styled-form">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Date d'inscription:</label>
          <input
            v-model="registration.dateRegister"
            disabled
            required
            class="form-control form-control-sm"
            type="date"
          />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Date debut:</label>
          <input
            v-model="registration.startDate"
            disabled
            required
            class="form-control form-control-sm"
            type="date"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Apprénant:</label>
          <select
            v-model="registration.studentId"
            disabled
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
        <div class="col-md-6 mb-3">
          <label class="form-label">Module:</label>
          <select
            v-model="registration.moduleId"
            disabled
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
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Date d'inscription:</label>
          <input
            v-model="registration.mount"
            disabled
            required
            class="form-control form-control-sm"
            type="text"
          />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Date Fin:</label>
          <input
            v-model="registration.endDate"
            disabled
            required
            class="form-control form-control-sm"
            type="date"
          />
        </div>
      </div>

      <div class="d-flex justify-content-between mt-4">
        <button
          type="button"
          @click="router.push({ name: 'registration-list' })"
          class="btn btn-cancel w-100 flex-grow-1"
        >
          Retour
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
import { useRoute } from "vue-router";
const store = storeRegistration();

const registration = ref({
  dateRegister: "",
  startDate: "",
  studentId: "",
  moduleId: "",
  mount: "",
  endDate: "",
});
const id = Number(useRoute().params.id);
onMounted(async () => {
  try {
    const result = await store.findRegistration(id);
    await storeModule().loadData();
    await storeStudent().loadData();
    registration.value = {
      ...result,
      startDate: new Date(result.startDate).toISOString().split("T")[0],
      dateRegister: new Date(result.dateRegister).toISOString().split("T")[0],
      endDate: new Date(result.endDate).toISOString().split("T")[0],
    };
  } catch (error) {
    console.log("Erreur lors de la recupération de l'apprénent: ", error);
  }
});
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