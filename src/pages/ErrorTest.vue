<script setup lang="ts">
import { ref, defineComponent, h } from 'vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const shouldCrash = ref(false)

const ErrorThrower = defineComponent({
  render() {
    return h('div')
  },
})
</script>

<template>
  <div class="flex items-center justify-center min-h-[80vh] px-6">
    <Card class="max-w-md w-full rounded-2xl shadow-md">
      <CardHeader>
        <CardTitle>Error Handler Test</CardTitle>
      </CardHeader>
      <CardContent class="space-y-4">
        <p class="text-muted-foreground">
          Click the button below to intentionally crash this page and test
          your global error handler.
        </p>
        <Button
          variant="destructive"
          class="w-full"
          @click="shouldCrash = true"
        >
          Trigger Error
        </Button>

        <!-- Only mounts when shouldCrash is true, throws on mount -->
        <ErrorThrower v-if="shouldCrash" />
      </CardContent>
    </Card>
  </div>
</template>
