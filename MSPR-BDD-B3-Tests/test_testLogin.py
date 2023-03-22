# Generated by Selenium IDE
import pytest
import time
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.common.exceptions import NoSuchElementException

class TestTestLogin():
  def setup_method(self, method):
    self.driver = webdriver.Chrome()
    self.vars = {}
  
  def teardown_method(self, method):
    self.driver.quit()
  
  def test_testLogin(self):
    url = "http://localhost:3000/"
    self.driver.get(url)
    self.driver.set_window_size(1936, 1056)
    try:
      self.driver.find_element(By.CSS_SELECTOR, ".circle").click()
      self.driver.find_element(By.LINK_TEXT, "Se connecter").click()
      self.driver.find_element(By.ID, "form2Example17").click()
      self.driver.find_element(By.ID, "form2Example17").send_keys("remi@remi.fr")
      self.driver.find_element(By.ID, "form2Example27").click()
      self.driver.find_element(By.ID, "form2Example27").send_keys("T@st96745")
      self.driver.find_element(By.ID, "logButton").click()
      time.sleep(1)
      print(self.driver.current_url)
      if self.driver.current_url == url + "SearchPlant":
        assert True
      else:
        assert False
    except NoSuchElementException:
      assert False
  
