<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary-custom">
    <div class="container">
      <h1 class="navbar-brand">Gestion de Suivie des apprenants</h1>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'student-list' }" class="nav-link">
              <i class="fa-solid fa-graduation-cap"></i> Apprénants
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'module-list' }" class="nav-link">
              <i class="fas fa-certificate"></i> Modules
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'registration-list' }" class="nav-link">
              <i class="fas fa-user-plus"></i> Inscriptions
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'payment-list' }" class="nav-link">
              <i class="fas fa-credit-card"></i> Payements
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const user = reactive({
  nom: "",
  email: "",
  profileImage: "",
});

const isLoggedIn = ref(false);
const isAdmin = ref(false);

const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "?");

const logout = () => {
  localStorage.removeItem("token");
  location.reload();
};

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (token) {
    isLoggedIn.value = true;

    try {
      const response = await axios.get("http://localhost:4000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data && response.data.user) {
        user.nom = response.data.user.nom;
        user.email = response.data.user.email;
        user.profileImage = response.data.user.profileImage;
        isAdmin.value = response.data.user.role === "ADMIN";
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
    }
  }
});
</script>

<style scoped>
.bg-primary-custom {
  background-color: #218838;
}

.navbar-brand {
  font-weight: bold;
  display: flex;
  align-items: center;
  color: white !important;
}

.navbar-brand img {
  margin-right: 10px;
}

.nav-link {
  color: white !important;
}

.nav-link:hover {
  color: #e6a313 !important;
}

.navbar-toggler-icon {
  filter: brightness(0) invert(1);
}

.profile-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
}

.profile-initial {
  background-color: #f5f5f5;
  color: #218838;
  font-weight: bold;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
}
</style>
