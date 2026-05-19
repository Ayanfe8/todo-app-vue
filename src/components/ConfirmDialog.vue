<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

defineProps<{
  open: boolean
  title: string
  description: string
}>()

const emit = defineEmits<{
  cancel: []
  confirm: []
}>()
</script>

<template>
  <Dialog :open="open" @update:open="(val) => !val && emit('cancel')">
    <DialogContent class="sm:max-w-[400px]">
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>{{ description }}</DialogDescription>
      </DialogHeader>
      <DialogFooter class="flex justify-end gap-2">
        <Button variant="outline" @click="emit('cancel')">
          Cancel
        </Button>
        <Button variant="destructive" @click="emit('confirm')">
          Confirm
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>