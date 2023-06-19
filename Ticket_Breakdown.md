# Ticket Breakdown

We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**

Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".

You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

# Assumptions -

1. Currently, Facilities table will have some foreign key mapping to Agent ID from Agent table
2. Same agents can work for different facilities
3. It seems there is no UI available to facilities teams. They only receive a pdf report.
4. I'm assuming there is a UI available on our side where admin teams can modify agent/facilities details. This existing app/UI will be extended to enter the new IDs provided by facilities teams
5. The facilities team is fine with the existing data being as is. This task is for any new agents.
6. If this data is to be upadted for existing agents as well, then this can be enabled by running a database script. Effort for this is not included in my estimates, but should not be more than 2 days inclusive of design, query execution, testing, validation

# Existing -

Facilities table ( columns - ID, name, ...)
Agents table ( columns - ID, name, email, ...)
Shifts table ( column - facilityId, agentId, time ... )

# Solution -

Create new table FacilitiesAgents. Structure below. The logic and process for fetching data remains the same, just that the query for getShiftsByFacility will now have an additional join with new table FacilitiesAgents and include facilityAgentId in the select clause instead of agentID.
This will also be backward compatible. For the agents and facilities combo where the facilityAgentId is not updated, we can fall back to our orginal agentId

In the existing UI app for Facilities we'll need to provide

Table - FacilitiesAgents

Columns -
facilityId - maps to an ID in facility table
agentId - maps to an ID in agent table
facilityAgentId - Set by the facility

Primary Key -> facilityId + agentId

Non nulls -> facilityId, agentId, facilityAgentId

# ------------- Tickets -------------

- All dev efforts include unit testing effort
- UX design is assumed to be ready and taken care of by a different team
- Manual testing, Integration testing effort not included

# --- Ticket 0 - Parent Ticket ----

Title - Implement new feature to add Facility provided ID in facility

Description - The existing UI for capturing agent data should be ammended to be able to capture facility ID and facilityAgentId. The new report for every facility should show the facility provided agent ID but should default to agent ID available in Agent table (as is the design currently) if this facility provided ID is not available.

Effort - 0. Effort will be distributed in the actual tickets below

# ---- Ticket 1 - Data Engineer ----

Title - Create new database table with constraints

Description - Create a new table with following details through relevant database control tool. (Table details covered in solution section above)

Acceptance Criteria - The database table should be available for read and write

Effort - 2 days (most organizations have controls around running DDL on databases. The effort included adding the table, verifying and admin tasks related to performing such an activity)

# --- Ticket 2 - Backend ----

Title - Modify existing API to store additional detail for every Agent

Description - Modify existing save API for agent to accept 2 more fields - facility ID and agentFacilityID. The fields should be saved in new FacilitiesAgents table.

Acceptance Criteria - Data is coherent and accurate in old and new tables. Existing functionality works as it is

Effort - 4 days

# --- Ticket 3 - Backend ---

Title - Add logic to retrieve new dataset

Description - Modify existing query logic for data retrieval for function `getShiftsByFacility` to capture agentFacilityID.

Acceptance Criteria - Data received is as per new expectation

Effort - 2 day

# -- Ticket 4 - UI (Assuming that a UI already exists) ----

Title - Update Agent UI to collect 2 more data points - facility ID and agentFacilityID

Description - Add additional elements (most probbaly text field with validations) to add Facility Agent ID and modify save Agent API call to provide updated data

Acceptance Criteria - UI should be able to capture Facility ID and agentFacilityID against an agent

Effort - 2 days

# --- Ticket 5 - Integration testing ---

Title - Automated integration testing effort for the new functionality

Effort - 2 days

`If this data is to be updated for existing agents as well, then this can be enabled by running a database script. Effort for this is not included in my estimates, but should not be more than 2 days inclusive of design, query execution, testing, validation`
