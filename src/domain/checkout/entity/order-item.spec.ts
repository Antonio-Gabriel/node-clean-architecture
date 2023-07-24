import OrderItem from './order-item';

describe("Order Item unit tests", () => {
    it("should throw error when id is empty", () => {
      expect(() => {
        const item = new OrderItem("", "Item 1", 100, "p1", 2);
      }).toThrowError("Id is required");
    });
  
    it("should throw error when name is empty", () => {
      expect(() => {
        const item = new OrderItem("i1", "", 100, "p1", 2);
      }).toThrowError("Name is required");
    });
  
    it("should throw error when price less or equals zero", () => {
      expect(() => {
        const item = new OrderItem("i1", "Item 1", 0, "p1", 2);
      }).toThrowError("Price must be greater than 0");
    });
  
    it("should throw error when productId is empty", () => {
      expect(() => {
        const item = new OrderItem("i1", "Item 1", 100, "", 2);
      }).toThrowError("ProductId is required");
    });
  
    it("should throw error when quantity less or equals zero", () => {
      expect(() => {
        const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
      }).toThrowError("Quantity must be greater than 0");
    });
  
    it("should calculate price correctly", () => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
      expect(item.total()).toBe(200);
    });
  });