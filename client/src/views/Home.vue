<template>
    <HeroSection />
    <CommitmentSection />
    <CategoriesSection />
    <AdvantagesSection />
    <ProcessStepsSection />
    <div class="py-16 flex justify-center">
        <TestimonialCarousel />
    </div>
    <NewsletterSection />
    <ContactSection>
        <template #intro>
            <p>Pour toute assistance, n'hésitez pas à nous contacter.</p>
        </template>
    </ContactSection>
</template>

<script setup lang="ts">
import HeroSection from '../components/home/HeroSection.vue';
import CommitmentSection from '../components/home/CommitmentSection.vue';
import CategoriesSection from '../components/home/CategoriesSection.vue';
import AdvantagesSection from '../components/home/AdvantagesSection.vue';
import ProcessStepsSection from '../components/home/ProcessStepsSection.vue';
import TestimonialCarousel from '../components/common/TestimonialCarousel.vue';
import NewsletterSection from '../components/home/NewsletterSection.vue';
import ContactSection from '../components/common/ContactSection.vue';
</script>
