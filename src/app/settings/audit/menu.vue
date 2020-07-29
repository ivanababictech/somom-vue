<template>
  <v-card>
    <v-list dense two-line subheader>
      <v-subheader>Audit Settings</v-subheader>

      <v-list-tile to="/settings/audit/auditors">
        <v-list-tile-content>
          <v-list-tile-title>Auditors</v-list-tile-title>
          <v-list-tile-sub-title>View/edit auditors</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/settings/audit/sections">
        <v-list-tile-content>
          <v-list-tile-title>Audit Sections</v-list-tile-title>
          <v-list-tile-sub-title>View/edit audit sections</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/settings/audit/questions">
        <v-list-tile-content>
          <v-list-tile-title>Questions</v-list-tile-title>
          <v-list-tile-sub-title>View/edit questions</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/settings/audit/audit-planning-control-checklist">
        <v-list-tile-content>
          <v-list-tile-title>Audit Planning Control Checklist</v-list-tile-title>
          <v-list-tile-sub-title>View/edit Audit Planning Control Checklist</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/settings/audit/audit-area">
        <v-list-tile-content>
          <v-list-tile-title>Audit Area</v-list-tile-title>
          <v-list-tile-sub-title>View/edit Audit Area</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/settings/audit/independence-questionnaire">
        <v-list-tile-content>
          <v-list-tile-title>Independence Questionnaire</v-list-tile-title>
          <v-list-tile-sub-title>View/edit Independence Questionnaire</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/settings/audit/general-risk-assessment">
        <v-list-tile-content>
          <v-list-tile-title>General Risk Assessment</v-list-tile-title>
          <v-list-tile-sub-title>View/edit General Risk Assessment</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/settings/audit/acceptance">
        <v-list-tile-content>
          <v-list-tile-title>Acceptance</v-list-tile-title>
          <v-list-tile-sub-title>View/edit Acceptance</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/settings/audit/preliminary-ar">
        <v-list-tile-content>
          <v-list-tile-title>Preliminary AR</v-list-tile-title>
          <v-list-tile-sub-title>View/edit Preliminary AR</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/settings/audit/is-review">
        <v-list-tile-content>
          <v-list-tile-title>Is Review</v-list-tile-title>
          <v-list-tile-sub-title>View/edit Is Review</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile to="/settings/audit/client-identification">
        <v-list-tile-content>
          <v-list-tile-title>Client identification</v-list-tile-title>
          <v-list-tile-sub-title>View/edit Client identification</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    
  </v-card>
</template>

<script>
export default {
  data: () => ({
    
  }),
}
</script>

<style scoped>
ul {
  padding: 0;
}
</style>
