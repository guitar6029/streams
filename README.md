# Node.js Streams

## Concepts

- Readable Streams
- Writable Streams
- Backpressure
- Chunk vs Row processing
- CSV ingestion

## Exercises

### 01 Basics

- Writing 1 million records
- File copy streams
- Backpressure handling

### 02 Payment Transform

Transforms client payment CSVs into an internal format.

Pipeline:

Parse
→ Sanitize
→ Validate
→ Normalize
→ Format
→ Write

Example:

1001, acme corp ,$1250.50,4/15/2026,paid

↓

1001,ACME CORP,125050,2026-04-15,PAID
