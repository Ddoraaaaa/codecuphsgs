import BlockingQueue from "../../src/judge/blocking_queue";

describe("Testing BlockingQueue", () => { 
    it("Testing add, remove and element", () => { 
        const blockingQueue = new BlockingQueue(); 
        blockingQueue.add(1); 
        blockingQueue.add(2); 
        expect(blockingQueue.remove()).toBe(1); 
        expect(blockingQueue.remove()).toBe(2); 
        expect(() => blockingQueue.remove()).toThrow("Queue is empty"); 
        expect(() => blockingQueue.element()).toThrow("Queue is empty"); 
    })

    it("Testing put with take", async () => { 
        const blockingQueue = new BlockingQueue(); 
        blockingQueue.put(1); 
        expect(await blockingQueue.take()).toBe(1); 

        const check2 = async() => {
            expect(await blockingQueue.take()).toBe(2); 
        }
        const check3 = async() => {
            expect(await blockingQueue.take()).toBe(3); 
        }
        check2(); 
        check3(); 
        await blockingQueue.put(2); 
        await blockingQueue.put(3); 
    })
})