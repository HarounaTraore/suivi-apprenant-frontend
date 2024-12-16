<template>
  <div class="container mt-4">
    <div
      class="header d-flex align-items-center justify-content-center mb-3 p-3"
    >
      <h2 class="title">Affichage</h2>
    </div>
    <form class="styled-form">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Nom complet:</label>
          <input
            disabled
            v-model="student.fullName"
            required
            class="form-control form-control-sm"
          />
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Tuteur:</label>
          <input
            disabled
            v-model="student.tutor"
            required
            class="form-control form-control-sm"
          />
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Email:</label>
        <input
          disabled
          v-model="student.email"
          required
          type="email"
          class="form-control form-control-sm"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Téléphone:</label>
        <input
          disabled
          v-model="student.phoneNumber"
          required
          class="form-control form-control-sm"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Adresse:</label>
        <input
          disabled
          v-model="student.address"
          required
          class="form-control form-control-sm"
        />
      </div>
      <div class="d-flex justify-content-between w-100 mt-4">
        <button
          type="submit"
          class="btn btn-primary flex-grow-1 me-2"
          @click="router.push({ name: 'student-list' })"
        >
          Retour
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import router from "@/router";
import { storeStudent } from "@/stores/storeStudent";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const store = storeStudent();
const student = ref({
  fullName: "",
  phoneNumber: "",
  tutor: "",
  address: "",
  email: "",
});
const id = Number(useRoute().params.id);
onMounted(async () => {
  try {
    const result = await store.findStudent(id);
    student.value = result;
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