import multiprocessing
import sys
import subprocess


def run_script(module_path):
    subprocess.run([sys.executable, "-m", module_path])


if __name__ == "__main__":
    paths = [
        "agents.matchmaker",
        "agents.attendee_agent"
    ]

    processes = [multiprocessing.Process(target=run_script, args=(p,)) for p in paths]
    for proc in processes:
        proc.start()
    for proc in processes:
        proc.join()
