import { contains, equals } from "utils"

describe("utils", () => {
  describe("contains", () => {
    it("finds something", () => {
      const needle = {}
      const haystack = [needle]
      expect(contains(haystack, needle)).toEqual(true)
      haystack.push({})
      expect(contains(haystack, needle)).toEqual(true)
      haystack.unshift({})
      expect(contains(haystack, needle)).toEqual(true)
    })
    it("finds nothing", () => {
      const needle = {}
      const haystack = []
      expect(contains(haystack, needle)).toEqual(false)
      haystack.push({})
      expect(contains(haystack, needle)).toEqual(false)
      haystack.unshift({})
      expect(contains(haystack, needle)).toEqual(false)
    })
  })
  describe("equals", () => {
    it("matches", () => {
      const a = {}
      const b = {}
      expect(equals(a, a)).toEqual(true)
      expect(equals(a, b)).toEqual(true)
      expect(equals(b, a)).toEqual(true)
      expect(equals(b, b)).toEqual(true)
    })
    it("mismatches", () => {
      const a = {
        a : "a",
        b : "b"
      }
      const b = {
        a : "a",
        c : "c"
      }
      const c = {
        a : "a",
        b : "b",
        c : "c"
      }
      expect(equals(a, b)).toEqual(false)
      expect(equals(a, c)).toEqual(false)
      expect(equals(b, c)).toEqual(false)

      expect(equals(b, a)).toEqual(false)
      expect(equals(c, a)).toEqual(false)
      expect(equals(c, b)).toEqual(false)
    })
  })
})
