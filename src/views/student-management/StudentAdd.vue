<template>
  <div class="container mt-4">
    <div class="header d-flex align-items-center justify-content-center mb-3 p-3">
      <h2 class="title">Ajouter un nouveau Apprenant</h2>
    </div>
    <form @submit.prevent="validateForm" class="styled-form">
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Nom complet:</label>
          <input
            v-model="student.fullName"
            class="form-control form-control-sm"
          />
          <div v-if="errors.fullName" class="text-danger">{{ errors.fullName }}</div>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Tuteur:</label>
          <input
            v-model="student.tutor"
            class="form-control form-control-sm"
          />
          <div v-if="errors.tutor" class="text-danger">{{ errors.tutor }}</div>
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label">Email:</label>
        <input
          v-model="student.email"
          type="email"
          class="form-control form-control-sm"
        />
        <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
      </div>
      <div class="mb-3">
        <label class="form-label">Téléphone:</label>
        <input
          v-model="student.phoneNumber"
          class="form-control form-control-sm"
        />
        <div v-if="errors.phoneNumber" class="text-danger">{{ errors.phoneNumber }}</div>
      </div>
      <div class="mb-3">
        <label class="form-label">Adresse:</label>
        <input
          v-model="student.address"
          class="form-control form-control-sm"
        />
        <div v-if="errors.address" class="text-danger">{{ errors.address }}</div>
      </div>
      <div class="d-flex justify-content-between mt-4">
        <button type="submit" class="btn btn-primary flex-grow-1 me-2">
          Enregistrer
        </button>
        <button
          type="button"
          @click="router.push({ name: 'student-list' })"
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
import { storeStudent } from "@/stores/storeStudent";
import { ref } from "vue";

const store = storeStudent();
const student = ref({
  fullName: "",
  phoneNumber: "",
  tutor: "",
  address: "",
  email: "",
});
const errors = ref({
  fullName: null,
  tutor: null,
  email: null,
  phoneNumber: null,
  address: null,
});

const validateForm = () => {
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = null;
  });

  let isValid = true;
  if (!student.value.fullName) {
    errors.value.fullName = "Le nom complet est requis.";
    isValid = false;
  } else if (student.value.fullName.length < 2 || student.value.fullName.length > 50) {
    errors.value.fullName = "Le nom doit contenir entre 2 et 50 caractères.";
    isValid = false;
  } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(student.value.fullName)) {
    errors.value.fullName = "Le nom ne doit contenir que des lettres.";
    isValid = false;
  }

  if (!student.value.tutor) {
    errors.value.tutor = "Le nom du tuteur est requis.";
    isValid = false;
  } else if (student.value.tutor.length < 2 || student.value.tutor.length > 50) {
    errors.value.tutor = "Le nom du tuteur doit contenir entre 2 et 50 caractères.";
    isValid = false;
  } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(student.value.tutor)) {
    errors.value.tutor = "Le nom du tuteur ne doit contenir que des lettres.";
    isValid = false;
  }

  if (!student.value.email) {
    errors.value.email = "L'email est requis.";
    isValid = false;
  } else if (!isValidEmail(student.value.email)) {
    errors.value.email = "Veuillez entrer un email valide.";
    isValid = false;
  }

  if (!student.value.phoneNumber) {
    errors.value.phoneNumber = "Le numéro de téléphone est requis.";
    isValid = false;
  } else if (!/^\d{8}$/.test(student.value.phoneNumber)) {
    errors.value.phoneNumber = "Le numéro de téléphone doit être composé de 8 chiffres.";
    isValid = false;
  }

  if (!student.value.address) {
    errors.value.address = "L'adresse est requise.";
    isValid = false;
  } else if (student.value.address.length < 2 || student.value.address.length > 50) {
    errors.value.address = "L'adresse doit contenir entre 2 et 50 caractères.";
    isValid = false;
  } else if (/^\d+$/.test(student.value.address)) {
    errors.value.address = "L'adresse ne peut pas être uniquement composée de chiffres.";
    isValid = false;
  }

  // Si tout est valide, soumettre le formulaire
  if (isValid) {
    newStudent();
  }
};

// Vérifier si un email est valide
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Fonction pour ajouter l'étudiant
const newStudent = async () => {
  try {
    await store.addStudent(
      student.value.fullName,
      student.value.email,
      student.value.tutor,
      student.value.address,
      student.value.phoneNumber
    );
    router.push({ name: "student-list" });
  } catch (error) {
    console.log("Erreur lors de l'ajout d'un apprenant : ", error);
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
