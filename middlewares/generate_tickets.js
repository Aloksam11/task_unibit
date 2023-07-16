function generate_unique_number() {
    const used_numbers = new Set();
  
    while (true) {
      // 6-digit number
      const number = Math.floor(Math.random() * 900000) + 100000; 
      // Random alphabet A to Z
      const alphabet = String.fromCharCode(65 + Math.floor(Math.random() * 26)); 
      const unique_number = number.toString() + alphabet;
  
      if (!used_numbers.has(unique_number)) {
        used_numbers.add(unique_number);
        return unique_number;
      }
    }
  }
  

function generate_tambula_tickets() {
  const tickets = {};
  let num_tickets = 6;
  for (let ticketNum = 1; ticketNum <= num_tickets; ticketNum++) {
    const ticket = [];

    // Generate a blank ticket grid
    for (let i = 0; i < 3; i++) {
      const row = new Array(9).fill(0);
      ticket.push(row);
    }

    // Generate an array of numbers from 1 to 90
    const numbers = Array.from({ length: 90 }, (_, index) => index + 1);

    // Fill the ticket array with 5 unique values in random order
    for (let row = 0; row < 3; row++) {
      const available_columns = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      const filled_columns = [];

      for (let i = 0; i < 5; i++) {
        const column_index = Math.floor(Math.random() * available_columns.length);
        const col = available_columns[column_index];
        filled_columns.push(col);
        available_columns.splice(column_index, 1);

        const start_number = col * 10;
        let end_number;
        if (col !== 8) {
          end_number = col * 10 + 9;
        } else {
          end_number = col * 10 + 10;
        }
        const column_numbers = numbers.filter(
          (number) => number >= start_number && number <= end_number
        );

        const number_index = Math.floor(Math.random() * column_numbers.length);
        const number = column_numbers[number_index];
        ticket[row][col] = number;
        numbers.splice(numbers.indexOf(number), 1);
      }

      filled_columns.sort((a, b) => a - b);

      // Fill remaining empty spaces with '0' or 'X'
      for (let col = 0; col < 9; col++) {
        if (!filled_columns.includes(col)) {
          ticket[row][col] = Math.random() < 0.5 ? 0 : 0;
        }
      }
    }
    const random_ticket_id = generate_unique_number();
    tickets[`ticketId : ${random_ticket_id}`] = ticket;
  }

  return { tickets };
}

module.exports = generate_tambula_tickets;