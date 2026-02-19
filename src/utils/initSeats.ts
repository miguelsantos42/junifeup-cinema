import { supabase } from '../lib/supabase'

/**
 * Initialize all seats in the database
 * This should be run once to set up the seating arrangement
 */
export async function initializeSeats() {
  const seats = []

  // Zone 1: Tables (4 tables, 2 seats each = 8 table seats)
  // Tables 1 and 2 on left, Tables 3 and 4 on right
  for (let tableNum = 1; tableNum <= 4; tableNum++) {
    seats.push({
      type: 'table',
      zone: 1,
      row: 1,
      position: 'A',
      table_number: tableNum,
    })
    seats.push({
      type: 'table',
      zone: 1,
      row: 1,
      position: 'B',
      table_number: tableNum,
    })
  }

  // Zone 1: Central chairs - 3 rows of 4 chairs, then 3 rows of 6 chairs
  // First 3 rows: 4 chairs each
  for (let row = 1; row <= 3; row++) {
    for (let pos = 1; pos <= 4; pos++) {
      seats.push({
        type: 'chair',
        zone: 1,
        row: row,
        position: pos,
      })
    }
  }
  
  // Next 3 rows: 6 chairs each
  for (let row = 4; row <= 6; row++) {
    for (let pos = 1; pos <= 6; pos++) {
      seats.push({
        type: 'chair',
        zone: 1,
        row: row,
        position: pos,
      })
    }
  }

  // Zone 2: 4 rows of 6 chairs
  for (let row = 1; row <= 4; row++) {
    for (let pos = 1; pos <= 6; pos++) {
      seats.push({
        type: 'chair',
        zone: 2,
        row: row,
        position: pos,
      })
    }
  }

  try {
    // Clear existing seats (optional - comment out if you want to keep existing)
    // await supabase.from('seats').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    const { data, error } = await supabase.from('seats').insert(seats).select()

    if (error) {
      console.error('Error initializing seats:', error)
      throw error
    }

    console.log(`Successfully initialized ${data?.length || 0} seats`)
    return data
  } catch (err) {
    console.error('Failed to initialize seats:', err)
    throw err
  }
}

// Uncomment to run initialization (should be done once)
// initializeSeats()
